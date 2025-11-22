
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!file) {
        reject(new Error('File is missing or invalid'));
        return;
    }
    const reader = new FileReader();
    try {
        reader.readAsDataURL(file);
    } catch (e) {
        reject(new Error('Failed to read file: ' + (e as Error).message));
        return;
    }
    
    reader.onload = () => {
      const result = reader.result as string;
      if (!result || typeof result !== 'string') {
          reject(new Error('Failed to read file content'));
          return;
      }
      // remove the `data:mime/type;base64,` prefix
      const parts = result.split(',');
      if (parts.length < 2) {
          reject(new Error('Invalid Data URL format'));
          return;
      }
      resolve(parts[1]);
    };
    reader.onerror = (error) => reject(error);
  });
};

export const dataUrlToFile = async (dataUrl: string, filename: string): Promise<File> => {
    if (!dataUrl) {
        throw new Error("Invalid dataUrl provided");
    }
    try {
        const res = await fetch(dataUrl);
        const blob = await res.blob();
        return new File([blob], filename, { type: blob.type });
    } catch (e) {
        console.error("DataUrl conversion error:", e);
        throw new Error("Failed to convert DataURL to File");
    }
};

/**
 * Downloads a resource from a given URL (can be a data URL or a blob URL).
 * This approach is more robust for mobile devices.
 * @param url The URL of the resource to download.
 * @param filename The desired filename for the downloaded file.
 */
export const downloadResource = async (url: string, filename: string) => {
  if (!url) return;
  
  try {
    // Fetch the resource to get it as a Blob
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch resource: ${response.statusText}`);
    }
    const blob = await response.blob();

    // Create an object URL for the Blob
    const objectUrl = window.URL.createObjectURL(blob);
    
    // Create a link element to trigger the download
    const link = document.createElement('a');
    link.href = objectUrl;
    link.download = filename;
    
    // Append to the document, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up the object URL
    window.URL.revokeObjectURL(objectUrl);
  } catch (error) {
    console.error('Download failed, trying simple fallback:', error);
    // Fallback for browsers that might have issues with the fetch/blob method
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
