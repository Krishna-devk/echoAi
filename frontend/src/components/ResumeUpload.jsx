import api from '@/lib/api';

const ResumeUpload = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('idle'); // idle, uploading, success, error
  const [progress, setProgress] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');

  const onDrop = useCallback((acceptedFiles) => {
    const selectedFile = acceptedFiles[0];
    if (selectedFile) {
      setFile(selectedFile);
      handleUpload(selectedFile);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    multiple: false
  });

  const handleUpload = async (file) => {
    setStatus('uploading');
    setProgress(10);
    setErrorMsg('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await api.post('/resumes/upload/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setProgress(percentCompleted);
        },
      });
      
      setStatus('success');
      if (onUploadSuccess) onUploadSuccess(response.data);

    } catch (error) {
      console.error('Upload failed:', error);
      setStatus('error');
      setErrorMsg(error.message || 'Failed to connect to backend engine.');
    }
  };

  return (
    <Card className="glass overflow-hidden border-dashed border-2 border-primary/30 hover:border-primary/60 transition-colors">
      <div {...getRootProps()} className="p-12 cursor-pointer outline-none">
        <input {...getInputProps()} />
        
        <AnimatePresence mode="wait">
          {status === 'idle' && (
            <motion.div
              key="idle"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center text-center space-y-6"
            >
              <div className="w-20 h-20 bg-primary/10 rounded-[30px] flex items-center justify-center text-primary group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-inner">
                <Upload className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-2xl font-black tracking-tight">Drop Resume Here</h3>
                <p className="text-base text-text-secondary mt-2 font-medium">
                  PDF or DOCX accepted. AI will parse skills instantly.
                </p>
              </div>
              <Button variant="secondary" className="mt-4 px-8 h-12 rounded-2xl font-bold bg-surface-accent text-primary hover:bg-primary hover:text-primary-foreground transition-all">
                Select from Computer
              </Button>
            </motion.div>
          )}

          {status === 'uploading' && (
            <motion.div
              key="uploading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6 w-full max-w-sm mx-auto"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center text-primary animate-pulse">
                  <FileText className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold truncate">{file?.name}</p>
                  <p className="text-xs text-text-secondary">Processing with AI Engine...</p>
                </div>
              </div>
              <div className="space-y-2">
                <Progress value={progress} className="h-2" />
                <div className="flex justify-between text-[10px] uppercase tracking-wider font-bold text-text-secondary">
                  <span>Uploading</span>
                  <span>{progress}%</span>
                </div>
              </div>
            </motion.div>
          )}

          {status === 'success' && (
            <motion.div
              key="success"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center text-center space-y-4"
            >
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center text-green-500">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Analysis Complete!</h3>
                <p className="text-sm text-text-secondary mt-1">
                  Your resume has been parsed and indexed.
                </p>
              </div>
              <Button onClick={() => setStatus('idle')} variant="outline" size="sm" className="mt-4">
                Upload Another
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Card>
  );
};

export default ResumeUpload;
