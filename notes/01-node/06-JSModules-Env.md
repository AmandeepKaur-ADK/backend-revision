# CommonJS(CJS) vs ECMAScript Modules(ESM)

CommonJS (require): The original Node.js standard. It is synchronous. When you call require(), Node stops everything, reads the file, executes it, and returns the module.exports object.

ES Modules (import): The modern JavaScript standard. It is asynchronous. It allows for Tree Shaking (removing unused code during the build process) which is much harder to do with CJS.

## Questions

"Where do require, module, and \_\_dirname come from? They aren't in the global scope!"
The Answer: Before Node executes a CommonJS file, it wraps the code in an invisible function called the Module Wrapper:
This is why these variables feel like globals, but are actually local to each module.

# PROCESS Object

The process object is a global that provides information about, and control over, the current Node.js process. It is an instance of EventEmitter.

Key Properties to Know:
process.env: Contains the user environment. This is where you access your configuration (like API keys).

process.argv: An array containing the command-line arguments passed when the Node.js process was launched.

process.nextTick(): As we discussed in the Event Loop section, this is used to schedule a callback to be invoked in the next iteration of the event loop.

process.cwd() vs **dirname: \* **dirname is the directory of the file being executed.

process.cwd() is the directory from which you launched the node command.

# Environment Variables (.env)

Environment variables are used to manage configuration across different environments (Development, Staging, Production) without changing the code.

Advanced Best Practices:
Never commit .env files: Always add them to .gitignore.

Validation: For senior roles, mention that you use libraries like dotenv combined with Joi or Zod to validate that all required environment variables exist before the server starts.

Secret Management: In a production/cloud environment (AWS, GCP), we don't use .env files on the disk; we use Secret Managers that inject these variables directly into process.env in RAM for better security.
