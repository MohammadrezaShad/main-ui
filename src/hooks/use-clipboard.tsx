import {useState} from 'react';

// Custom hook for copying text to clipboard
const useClipboard = () => {
  // State to manage the copied text
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Function to copy text to clipboard
  const copyToClipboard = async (text: string) => {
    try {
      // Use navigator.clipboard.writeText to copy text to clipboard
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
    } catch (error) {
      console.error('Error copying text to clipboard:', error);
      throw new Error('Failed to copy text to clipboard.');
    }
  };

  return {copiedText, copyToClipboard};
};

export default useClipboard;
