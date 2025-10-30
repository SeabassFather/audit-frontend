import { useState, useCallback } from "react";
import { apiUpload } from "../utils/api";

export default function useFileUpload() {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const uploadFile = useCallback(async (file, endpoint = "/api/upload", extraFields = {}) => {
    setUploading(true);
    setError(null);
    setProgress(0);

    try {
      const formData = new FormData();
      formData.append("file", file);
      
      // Add extra fields
      Object.entries(extraFields).forEach(([key, value]) => {
        formData.append(key, value);
      });

      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90));
      }, 100);

      const result = await apiUpload(endpoint, formData);
      
      clearInterval(progressInterval);
      setProgress(100);
      
      setUploadedFiles(prev => [...prev, {
        id: result.id || Date.now(),
        name: file.name,
        size: file.size,
        type: file.type,
        url: result.url,
        ...result
      }]);

      return { ok: true, data: result };
    } catch (err) {
      setError(err.message);
      return { ok: false, error: err.message };
    } finally {
      setUploading(false);
      setTimeout(() => setProgress(0), 1000);
    }
  }, []);

  const uploadMultiple = useCallback(async (files, endpoint = "/api/upload", extraFields = {}) => {
    const results = [];
    const errors = [];

    for (const file of files) {
      const result = await uploadFile(file, endpoint, extraFields);
      if (result.ok) {
        results.push(result.data);
      } else {
        errors.push({ file: file.name, error: result.error });
      }
    }

    return {
      ok: errors.length === 0,
      results,
      errors: errors.length > 0 ? errors : null
    };
  }, [uploadFile]);

  const clearUploads = useCallback(() => {
    setUploadedFiles([]);
    setError(null);
  }, []);

  return {
    uploading,
    progress,
    error,
    uploadedFiles,
    uploadFile,
    uploadMultiple,
    clearUploads,
  };
}