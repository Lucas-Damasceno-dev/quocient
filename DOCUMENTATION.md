# Documentation

This file provides a detailed explanation of the folder structure and the purpose of each directory.

## Folder Structure

```
/src
├── assets
├── components
│   ├── layout
│   ├── quiz
│   └── ui
├── context
├── hooks
├── lib
├── services
├── styles
├── types
├── utils
└── validation
```

### `/src/assets`

This directory contains all the static assets of the application, such as images and icons.

### `/src/components`

This directory contains all the React components of the application. The components are organized into three subdirectories:

- **`/src/components/layout`:** This directory contains the layout components of the application, such as the header, footer, and page container.
- **`/src/components/quiz`:** This directory contains the components related to the quiz functionality, such as the quiz configuration form, the question card, and the results page.
- **`/src/components/ui`:** This directory contains the reusable UI components of the application, such as buttons, inputs, and cards.

### `/src/context`

This directory contains the React context of the application. The context is used to manage the state of the quiz and provide it to all the components that need it.

### `/src/hooks`

This directory contains all the custom React hooks of the application. The hooks are used to encapsulate reusable logic, such as making API calls and managing form state.

### `/src/lib`

This directory contains all the utility functions of the application.

### `/src/services`

This directory contains all the services of the application. The services are used to interact with external APIs, such as the Trivia API.

### `/src/styles`

This directory contains all the global styles of the application.

### `/src/types`

This directory contains all the TypeScript types of the application.

### `/src/utils`

This directory contains all the utility functions of the application.

### `/src/validation`

This directory contains all the validation schemas and functions of the application. The validation is done using Zod.
