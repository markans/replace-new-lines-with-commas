import { Hono } from 'hono'
import { renderer } from './renderer'

const app = new Hono()

app.use(renderer)

app.get('/', (c) => {
  return c.render(
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            <i className="fas fa-exchange-alt mr-3 text-blue-600"></i>
            Newline to Comma Converter
          </h1>
          <p className="text-xl text-gray-600">
            Paste your text with line breaks and instantly convert to comma-separated values
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label htmlFor="input" className="text-lg font-semibold text-gray-700 flex items-center">
                  <i className="fas fa-paste mr-2 text-green-600"></i>
                  Input (Paste your text here)
                </label>
                <button 
                  id="clearInput"
                  className="px-4 py-2 text-sm bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors flex items-center"
                >
                  <i className="fas fa-trash mr-2"></i>
                  Clear
                </button>
              </div>
              <textarea
                id="input"
                placeholder="Paste your text here...&#10;Each line will become&#10;a comma-separated item"
                className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
              ></textarea>
              <div className="text-sm text-gray-500 flex items-center">
                <i className="fas fa-info-circle mr-2"></i>
                <span id="inputCount">0 lines</span>
              </div>
            </div>

            {/* Output Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label htmlFor="output" className="text-lg font-semibold text-gray-700 flex items-center">
                  <i className="fas fa-copy mr-2 text-blue-600"></i>
                  Output (Auto-converted)
                </label>
                <button 
                  id="copyOutput"
                  className="px-4 py-2 text-sm bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors flex items-center"
                >
                  <i className="fas fa-clipboard mr-2"></i>
                  Copy to Clipboard
                </button>
              </div>
              <textarea
                id="output"
                placeholder="Converted text will appear here automatically..."
                readonly
                className="w-full h-64 p-4 border border-gray-300 rounded-lg bg-gray-50 font-mono text-sm"
              ></textarea>
              <div className="text-sm text-gray-500 flex items-center">
                <i className="fas fa-check-circle mr-2 text-green-600"></i>
                <span id="outputStatus">Ready for conversion</span>
              </div>
            </div>
          </div>

          {/* Options */}
          <div className="mt-8 bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
              <i className="fas fa-cog mr-2"></i>
              Conversion Options
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <label className="flex items-center space-x-2">
                <input type="checkbox" id="trimWhitespace" checked className="text-blue-600" />
                <span className="text-sm text-gray-700">Trim whitespace</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" id="removeEmpty" checked className="text-blue-600" />
                <span className="text-sm text-gray-700">Remove empty lines</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" id="addSpace" className="text-blue-600" />
                <span className="text-sm text-gray-700">Space after comma</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" id="quotedOutput" className="text-blue-600" />
                <span className="text-sm text-gray-700">Quote each item</span>
              </label>
            </div>
          </div>

          {/* Example Usage */}
          <div className="mt-8 bg-blue-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center">
              <i className="fas fa-lightbulb mr-2"></i>
              Example Usage
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-blue-700 mb-2">Input:</h4>
                <code className="block bg-white p-3 rounded text-sm">
                  Apple<br/>
                  Banana<br/>
                  Cherry<br/>
                  Date
                </code>
              </div>
              <div>
                <h4 className="font-semibold text-blue-700 mb-2">Output:</h4>
                <code className="block bg-white p-3 rounded text-sm">
                  Apple,Banana,Cherry,Date
                </code>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500">
          <p className="flex items-center justify-center">
            <i className="fas fa-heart text-red-500 mr-2"></i>
            Simple, fast, and efficient text conversion tool
          </p>
        </div>
      </div>
    </div>
  )
})

export default app
