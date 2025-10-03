## Dev environment tips

This project uses Spec Kit Plus for Spec-Driven Development and is extended with MCP Servers for improved automation, live verification, research, and memory. Agents must prefer using the MCP tools and CLI commands to gather authoritative information and to run tasks — do not assume the best way from your internal knowledge without verification.

Use the MCP servers as first-class tools for discovery, verification, execution, and memory capture. Prefer CLI interactions (run commands and capture outputs) over relying purely on internal knowledge.

## Available MCP TOOLs Usage Instructions

 
  🟢 playwright - Ready (21 tools)
    Tools:
    - browser_click
    - browser_close
    - browser_console_messages
    - browser_drag
    - browser_evaluate
    - browser_file_upload
    - browser_fill_form
    - browser_handle_dialog
    - browser_hover
    - browser_install
    - browser_navigate
    - browser_navigate_back
    - browser_network_requests
    - browser_press_key
    - browser_resize
    - browser_select_option
    - browser_snapshot
    - browser_tabs
    - browser_take_screenshot
    - browser_type
    - browser_wait_for

  🟢 tavily-remote - Ready (4 tools)
    Tools:
    - tavily_crawl
    - tavily_extract
    - tavily_map
    - tavily_search

  🟢 context7 - Ready (2 tools)
    Tools:
    - get-library-docs
    - resolve-library-id

## Available Commands Usage Instructions

Core workflow:
- `/constitution` - Define project quality principles and governance
- `/specify <feature>` - Create feature specification
- `/plan` - Design architecture and technical approach
- `/tasks` - Break down implementation into testable tasks
- `/implement` - Execute tasks with TDD (red-green-refactor)

Knowledge capture:
- `/phr [title]` - Record prompt history (automatic after all work)
- `/adr [title]` - Document architecture decisions (suggested intelligently)

Analysis:
- `/analyze` - Cross-check specs, plans, and tasks for consistency

## Automatic Documentation Protocol

**CRITICAL**: This project requires comprehensive knowledge capture for team learning, compliance, and pattern recognition.

### Prompt History Records (PHR) - Always Automatic

After completing ANY work, automatically create a PHR:

1. **Detect work type**: constitution|spec|architect|implementation|debugging|refactoring|discussion|general
2. **Generate title**: 3-7 word descriptive title summarizing the work
3. **Capture context**: COMPLETE conversation (never truncate to summaries)
4. **Route correctly**:
   - Pre-feature work → `docs/prompts/`
   - Feature-specific work → `specs/<feature>/prompts/`
5. **Confirm**: Show "📝 PHR-NNNN recorded"

**Documentation captures everything**:
- Design discussions and technical decisions
- Architecture planning and API design
- Implementation (new features, debugging, refactoring)
- Problem-solving and troubleshooting
- Code reviews and optimizations
- Questions, clarifications, exploratory conversations
- **All development activity** - complete history

**Only exception**: Skip PHR for `/phr` command itself (prevents recursion).

**Technical execution**:
- Use `.**/commands/phr.md` template for creation
- Preserve FULL context - never truncate
- On error: warn but don't block workflow

### Architecture Decision Records (ADR) - Intelligent Suggestion

After completing design/architecture work, analyze for ADR significance:

**Three-part significance test** (ALL must be true):

1. **Impact**: Technical decision with long-term consequences?
   - Examples: Framework choice, data model design, API architecture, security approach, deployment platform

2. **Alternatives**: Multiple viable options were considered/debated?
   - Shows deliberation, not just default choices
   - Tradeoffs were weighed

3. **Scope**: Cross-cutting concern affecting multiple components or future decisions?
   - Not isolated implementation detail
   - Influences system design broadly

**If ALL conditions met**, suggest:
```
📋 Architectural decision detected: [brief-description]
   Document reasoning and tradeoffs? Run `/adr [decision-title]`
```

**Wait for user consent** - never auto-create ADRs.

**User may decline if**:
- Decision is obvious or standard practice
- Temporary/experimental (will change soon)
- Already documented in existing ADR

**ADR Granularity Principle**:
Document decision CLUSTERS, not atomic choices.

✅ **Good**: "Frontend Technology Stack" (Next.js + Tailwind + Vercel as integrated solution)
❌ **Bad**: Separate ADRs for Next.js, Tailwind, and Vercel

Group related technologies that:
- Work together as integrated solution
- Would likely change together
- Share rationale and tradeoffs

Separate ADRs only when decisions are independent and could diverge.

**Examples**:
- Technology stacks: Frontend stack, Backend stack, Data layer
- Authentication: Protocol + library + session strategy (ONE ADR)
- Deployment: Platform + CI/CD + monitoring (ONE ADR)

## Project Structure

- `docs/constitution.md` - Project principles (quality, testing, performance, governance)
- `specs/<feature>/spec.md` - Feature requirements and acceptance criteria
- `specs/<feature>/plan.md` - Architecture design and technical decisions
- `specs/<feature>/tasks.md` - Implementation breakdown with test cases
- `docs/prompts/` - Development history records (PHRs)
- `docs/adr/` - Architecture Decision Records
- `.specify/` - Spec Kit templates and scripts

## Workflow Pattern

```
1. Define principles    → /constitution
2. Specify feature      → /specify "User authentication"
3. Plan architecture    → /plan
4. Review decisions     → /adr (if prompted after planning)
5. Break into tasks     → /tasks
6. Implement with TDD   → /implement
```

After each step: PHR automatically created, ADRs suggested when appropriate.

## Code Standards

See `docs/constitution.md` for project-specific:
- Code quality requirements
- Testing standards (coverage, categories, TDD enforcement)
- Performance expectations
- Security guidelines
- Architecture principles

## Notes for Generic Agents

If your agent doesn't support Spec Kit commands natively:
1. Read `docs/constitution.md` for project principles
2. Check `specs/*/spec.md` for feature requirements
3. Review `specs/*/plan.md` for architecture decisions
4. Follow `specs/*/tasks.md` for implementation order
5. Respect automatic documentation protocol above

## Error Handling

- PHR creation errors: Warn but don't block workflow
- ADR creation errors: Report and allow manual creation
- Missing directories: Auto-create as needed
- Invalid stage detection: Fall back to 'general' stage
