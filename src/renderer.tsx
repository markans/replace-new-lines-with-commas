import { jsxRenderer } from 'hono/jsx-renderer'

export const renderer = jsxRenderer(({ children }) => {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Newline to Comma Converter - Text Conversion Tool</title>
        <meta name="description" content="Convert text with line breaks to comma-separated values instantly. Simple, fast, and efficient text conversion tool." />
        
        {/* TailwindCSS */}
        <script src="https://cdn.tailwindcss.com"></script>
        
        {/* FontAwesome */}
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet" />
        
        {/* Custom styles */}
        <link href="/static/style.css" rel="stylesheet" />
      </head>
      <body>
        {children}
        
        {/* JavaScript functionality */}
        <script>{`
          // Global variables
          let inputElement, outputElement, inputCountElement, outputStatusElement;
          let trimWhitespaceCheckbox, removeEmptyCheckbox, addSpaceCheckbox, quotedOutputCheckbox;
          let clearInputButton, copyOutputButton;
          
          // Initialize when DOM is loaded
          document.addEventListener('DOMContentLoaded', function() {
            // Get elements
            inputElement = document.getElementById('input');
            outputElement = document.getElementById('output');
            inputCountElement = document.getElementById('inputCount');
            outputStatusElement = document.getElementById('outputStatus');
            
            trimWhitespaceCheckbox = document.getElementById('trimWhitespace');
            removeEmptyCheckbox = document.getElementById('removeEmpty');
            addSpaceCheckbox = document.getElementById('addSpace');
            quotedOutputCheckbox = document.getElementById('quotedOutput');
            
            clearInputButton = document.getElementById('clearInput');
            copyOutputButton = document.getElementById('copyOutput');
            
            // Add event listeners
            inputElement.addEventListener('input', convertText);
            inputElement.addEventListener('paste', function() {
              setTimeout(convertText, 10); // Small delay to let paste complete
            });
            
            trimWhitespaceCheckbox.addEventListener('change', convertText);
            removeEmptyCheckbox.addEventListener('change', convertText);
            addSpaceCheckbox.addEventListener('change', convertText);
            quotedOutputCheckbox.addEventListener('change', convertText);
            
            clearInputButton.addEventListener('click', clearInput);
            copyOutputButton.addEventListener('click', copyToClipboard);
            
            // Auto-focus input
            inputElement.focus();
          });
          
          // Main conversion function
          function convertText() {
            const inputText = inputElement.value;
            
            if (!inputText.trim()) {
              outputElement.value = '';
              inputCountElement.textContent = '0 lines';
              outputStatusElement.textContent = 'Ready for conversion';
              outputStatusElement.className = 'text-sm text-gray-500 flex items-center';
              return;
            }
            
            // Split text into lines
            let lines = inputText.split(/\\r?\\n/);
            
            // Count original lines
            inputCountElement.textContent = lines.length + ' lines';
            
            // Apply options
            if (trimWhitespaceCheckbox.checked) {
              lines = lines.map(line => line.trim());
            }
            
            if (removeEmptyCheckbox.checked) {
              lines = lines.filter(line => line.length > 0);
            }
            
            // Quote items if requested
            if (quotedOutputCheckbox.checked) {
              lines = lines.map(line => '"' + line.replace(/"/g, '""') + '"');
            }
            
            // Join with comma
            const separator = addSpaceCheckbox.checked ? ', ' : ',';
            const result = lines.join(separator);
            
            outputElement.value = result;
            
            // Update status
            const itemCount = lines.length;
            outputStatusElement.innerHTML = '<i class="fas fa-check-circle mr-2 text-green-600"></i>Converted ' + itemCount + ' items';
            outputStatusElement.className = 'text-sm text-green-600 flex items-center';
            
            // Auto-copy to clipboard if there's content
            if (result) {
              copyToClipboardSilent(result);
            }
          }
          
          // Clear input function
          function clearInput() {
            inputElement.value = '';
            outputElement.value = '';
            inputCountElement.textContent = '0 lines';
            outputStatusElement.innerHTML = '<i class="fas fa-info-circle mr-2"></i>Ready for conversion';
            outputStatusElement.className = 'text-sm text-gray-500 flex items-center';
            inputElement.focus();
          }
          
          // Copy to clipboard with user feedback
          async function copyToClipboard() {
            const text = outputElement.value;
            
            if (!text) {
              showNotification('Nothing to copy!', 'error');
              return;
            }
            
            try {
              await navigator.clipboard.writeText(text);
              showNotification('Copied to clipboard!', 'success');
            } catch (err) {
              // Fallback for older browsers
              outputElement.select();
              document.execCommand('copy');
              showNotification('Copied to clipboard!', 'success');
            }
          }
          
          // Silent copy (auto-copy without notification)
          async function copyToClipboardSilent(text) {
            try {
              await navigator.clipboard.writeText(text);
            } catch (err) {
              // Ignore errors for silent copy
            }
          }
          
          // Show notification
          function showNotification(message, type) {
            // Remove existing notification
            const existing = document.getElementById('notification');
            if (existing) existing.remove();
            
            // Create notification
            const notification = document.createElement('div');
            notification.id = 'notification';
            notification.className = 'fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 flex items-center transition-all duration-300 ' + 
              (type === 'success' ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-red-100 text-red-800 border border-red-200');
            
            notification.innerHTML = '<i class="fas fa-' + (type === 'success' ? 'check-circle' : 'exclamation-circle') + ' mr-2"></i>' + message;
            
            document.body.appendChild(notification);
            
            // Auto-remove after 2 seconds
            setTimeout(() => {
              if (notification && notification.parentNode) {
                notification.style.opacity = '0';
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => {
                  if (notification && notification.parentNode) {
                    notification.remove();
                  }
                }, 300);
              }
            }, 2000);
          }
          
          // Keyboard shortcuts
          document.addEventListener('keydown', function(e) {
            // Ctrl+L or Cmd+L to clear
            if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
              e.preventDefault();
              clearInput();
            }
            
            // Ctrl+C or Cmd+C when focus is not on input to copy output
            if ((e.ctrlKey || e.metaKey) && e.key === 'c' && document.activeElement !== inputElement) {
              if (outputElement.value) {
                e.preventDefault();
                copyToClipboard();
              }
            }
          });
        `}</script>
      </body>
    </html>
  )
})
