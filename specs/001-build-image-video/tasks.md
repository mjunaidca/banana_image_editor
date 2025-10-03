# Tasks: Build Image Video Editor

**Input**: Design documents from `/specs/001-build-image-video/`
**Prerequisites**: plan.md (required), research.md, data-model.md, contracts/

## Execution Flow (main)
```
1. Load plan.md from feature directory
   → If not found: ERROR "No implementation plan found"
   → Extract: tech stack, libraries, structure
2. Load optional design documents:
   → data-model.md: Extract entities → model tasks
   → contracts/: Each file → contract test task
   → research.md: Extract decisions → setup tasks
3. Generate tasks by category:
   → Setup: project init, dependencies, linting
   → Tests: contract tests, integration tests
   → Core: models, services, CLI commands
   → Integration: DB, middleware, logging
   → Polish: unit tests, performance, docs
4. Apply task rules:
   → Different files = mark [P] for parallel
   → Same file = sequential (no [P])
   → Tests before implementation (TDD)
5. Number tasks sequentially (T001, T002...)
6. Generate dependency graph
7. Create parallel execution examples
8. Validate task completeness:
   → All contracts have tests?
   → All entities have models?
   → All endpoints implemented?
9. Return: SUCCESS (tasks ready for execution)
```

## Format: `[ID] [P?] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- Include exact file paths in descriptions

## Path Conventions
- **Web app**: Following Next.js 15 App Router structure in app/ directory

## Phase 3.1: Setup
- [X] T001 Create Next.js 15 project structure with TypeScript and TailwindCSS
- [X] T002 Initialize project with Next.js 15, TailwindCSS, shadcn/ui, Vercel AI SDK dependencies using pnpm and cli command.
- [X] T003 [P] Configure linting and formatting tools (ESLint, Prettier)
- [X] T004 [P] Install vercel ai sdk and shadcn/ui components (card, button, input, textarea) with required dependencies

## Phase 3.2: Tests First (TDD) ⚠️ MUST COMPLETE BEFORE 3.3
**CRITICAL: These tests MUST be written and MUST FAIL before ANY implementation**
- [X] T005 [P] Contract test for image and prompt processing in tests/contract/test_image_prompt_processing.ts
- [X] T006 [P] Integration test for image upload functionality in tests/integration/test_image_upload.ts
- [X] T007 [P] Integration test for prompt processing flow in tests/integration/test_prompt_processing.ts
- [X] T008 [P] Integration test for result display functionality in tests/integration/test_result_display.ts

## Phase 3.3: Core Implementation (ONLY after tests are failing)
- [X] T009 [P] Create ImageData interface in app/types/image.ts
- [X] T010 [P] Create PromptData interface in app/types/prompt.ts
- [X] T011 [P] Create ProcessingResult interface in app/types/result.ts
- [X] T012 Create main page component in app/page.tsx
- [X] T013 [P] Create ImageUploader component in app/components/ImageUploader.tsx
- [X] T014 [P] Create PromptInput component in app/components/PromptInput.tsx
- [X] T015 [P] Create ProcessingResult component in app/components/ProcessingResult.tsx
- [X] T016 [P] Create AI integration service in app/lib/ai.ts
- [X] T017 [P] Create utility functions in app/lib/utils.ts
- [X] T018 [P] Create root layout in app/layout.tsx
- [X] T019 Create environment variable validation for Google API key

## Phase 3.4: Integration
- [X] T020 Integrate ImageUploader with main page
- [X] T021 Integrate PromptInput with main page
- [X] T022 Integrate ProcessingResult with main page
- [X] T023 Connect AI service to UI components
- [X] T024 Add validation for image file types (JPG/PNG)
- [X] T025 Add validation for image file size (max 5MB)
- [X] T026 Add error handling for API calls
- [X] T027 Add loading states and processing feedback

## Phase 3.5: Polish
- [X] T028 [P] Unit test for utility functions in tests/unit/test_utils.ts
- [X] T029 [P] Unit test for AI integration in tests/unit/test_ai.ts
- [X] T030 [P] Component tests for UI components in tests/components/
- [X] T031 Update README.md with setup instructions
- [X] T032 Add documentation for environment variables in docs/environment.md
- [X] T033 Run manual testing following quickstart guide steps
- [X] T034 Performance testing for <2s response time
- [X] T035 Add accessibility features to UI components

## Dependencies
- T001 blocks T002
- T002 blocks T004
- T009-T011 blocks T013-T015 (components that use these types)
- T013-T015 blocks T012 (main page that uses components)
- T016 blocks T023 (AI service needed for integration)
- T018 blocks T012 (layout needed for page)
- Tests (T005-T008) before implementation (T009-T019)
- Implementation before polish (T028-T035)

## Parallel Example
```
# Launch T009-T011 together:
Task: "Create ImageData interface in app/types/image.ts"
Task: "Create PromptData interface in app/types/prompt.ts"
Task: "Create ProcessingResult interface in app/types/result.ts"

# Launch T013-T015 together:
Task: "Create ImageUploader component in app/components/ImageUploader.tsx"
Task: "Create PromptInput component in app/components/PromptInput.tsx"
Task: "Create ProcessingResult component in app/components/ProcessingResult.tsx"
```

## Notes
- [P] tasks = different files, no dependencies
- Verify tests fail before implementing
- Commit after each task
- Avoid: vague tasks, same file conflicts

## Task Generation Rules
*Applied during main() execution*

1. **From Contracts**:
   - Each contract file → contract test task [P]
   - Each endpoint → implementation task
   
2. **From Data Model**:
   - Each entity → model creation task [P]
   - Relationships → service layer tasks
   
3. **From User Stories**:
   - Each story → integration test [P]
   - Quickstart scenarios → validation tasks

4. **Ordering**:
   - Setup → Tests → Models → Services → Endpoints → Polish
   - Dependencies block parallel execution

## Validation Checklist
*GATE: Checked by main() before returning*

- [ ] All contracts have corresponding tests
- [ ] All entities have model tasks
- [ ] All tests come before implementation
- [ ] Parallel tasks truly independent
- [ ] Each task specifies exact file path
- [ ] No task modifies same file as another [P] task