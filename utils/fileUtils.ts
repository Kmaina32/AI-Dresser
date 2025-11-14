
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      // remove the `data:mime/type;base64,` prefix
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = (error) => reject(error);
  });
};

/**
 * Downloads a resource from a given URL (can be a data URL or a blob URL).
 * This approach is more robust for mobile devices.
 * @param url The URL of the resource to download.
 * @param filename The desired filename for the downloaded file.
 */
export const downloadResource = async (url: string, filename: string) => {
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
