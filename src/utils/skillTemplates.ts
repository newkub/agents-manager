export const skillTemplates = {
  'code-generator': {
    name: 'Code Generator',
    description: 'Generate code from natural language descriptions',
    template: `# Code Generator Skill

## Description
This skill generates code based on natural language descriptions.

## Capabilities
- Generate functions and classes
- Create boilerplate code
- Implement algorithms

## Usage
Describe the code you want, and this skill will generate it.

## Example
Input: "Create a function that sorts an array of numbers"
Output: 
\`\`\`typescript
function sortArray(arr: number[]): number[] {
  return arr.sort((a, b) => a - b);
}
\`\`\`
`,
  },
  'file-analyzer': {
    name: 'File Analyzer',
    description: 'Analyze code files and provide insights',
    template: `# File Analyzer Skill

## Description
This skill analyzes code files and provides insights about structure, complexity, and potential issues.

## Capabilities
- Detect code smells
- Suggest improvements
- Analyze dependencies

## Usage
Select a file to analyze, and this skill will provide detailed insights.
`,
  },
  'test-generator': {
    name: 'Test Generator',
    description: 'Generate unit tests for code',
    template: `# Test Generator Skill

## Description
This skill generates unit tests for your code.

## Capabilities
- Generate test cases
- Create mocks and stubs
- Suggest test coverage improvements

## Usage
Provide the code you want to test, and this skill will generate comprehensive tests.
`,
  },
  'documentation-writer': {
    name: 'Documentation Writer',
    description: 'Generate documentation from code',
    template: `# Documentation Writer Skill

## Description
This skill generates documentation from your code.

## Capabilities
- Generate JSDoc comments
- Create README files
- Write API documentation

## Usage
Provide the code you want to document, and this skill will generate comprehensive documentation.
`,
  },
};

export function getTemplate(type: string) {
  return skillTemplates[type as keyof typeof skillTemplates];
}

export function getTemplateNames() {
  return Object.keys(skillTemplates);
}
