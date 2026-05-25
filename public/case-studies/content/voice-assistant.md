# From IVR to Conversational AI: Designing a Voice Agent That Works for Everyone

**A case study in conversational design, personality-driven dialogue, and human-centered automation.**

---

## Problem to Solve

eDreams Odigeo's voice support suffered from a fundamental design flaw: the IVR was obstructive.

Customers called in with complex issues and it was hard to fit them into the traditional IVR system, which forced them into rigid menu trees. The gap between system and customer mental model was creating friction, frustration and high transfer rates.

- **Transfer rates at 18%** meant customers were bouncing between agents who had no context about why they'd been transferred
- **Security questions alone consumed 90 seconds per call**, adding 15% to average handle time
- **FAQ-resolvable inquiries (26% of call volume)** were being escalated to human agents at €15+ per contact

The real problem wasn't automation. It was that the system treated customer support as a routing problem, not a *conversation*. And it left agents to start from scratch on every transfer.

---

## Context Overview

**Timeline:** March 2025 – May 2026 (13 months, MVP to scale)

**Team:** Cross-functional (DS, Product, CSPM, Design)

---

## Project Brief

**Vision:** Enable customers to resolve their travel booking questions through natural conversation with an AI agent, without feeling they've lost control or context.

**Design focus:** Don't automate conversations for automation's sake. Design conversations that make human handoffs seamless and give agents the context they need to actually help.

**Key Constraints:**
- Multi-language complexity (different linguistic patterns, cultural tone expectations)
- High-stakes domain (customers have emotional, financial investment in their bookings)
- Need to prevent hallucinations (especially around refunds and membership promises)
- Coexistence with human agents (handoff experience matters as much as automation)

---

## Design: Three Fundamental Shifts

Moving from an IVR to a conversational AI system required rethinking how we approach dialogue design. We grounded our work in three core mental shifts:

### 1. **From Screens to Scripts**

Traditional UX design works in space (pixels, layout, visual hierarchy). Conversational design works in time (turns, pacing, sequence).

We stopped thinking about what the customer *sees* and started thinking about what gets *said*, and when. This meant:
- Every bot response had to earn its place in the dialogue
- Greeting, turn-taking, and closure became design decisions
- Error messages couldn't just be "Error: Authentication Failed." They needed to feel like part of the conversation

The core artifact shifted from wireframes to conversation scripts, where every line carries intention.

### 2. **From User Flows to Conversation Arcs**

A user flow is spatial: start node → decision → endpoint. A conversation arc is temporal and emotional: it has a beginning, middle, and resolution.

We mapped four building blocks into each conversation:
- **Persona**: Who is speaking? What's their tone? (This shapes every single response.)
- **Turn-taking**: Who speaks when? How do we avoid the bot dominating?
- **Context memory**: What information is being carried forward through the conversation? (Booking details, customer status, intent, authentication level)
- **Cognitive load**: How much is the customer processing at each moment?

This meant designing not just *what* the bot says, but the rhythm of the conversation and what the customer can reasonably handle at each stage.

### 3. **From UI States to Dialogue States**

In UI design, you design states: loading, error, success, empty. In conversational design, dialogue states are more nuanced because repair is built into conversation itself.

We designed three primary recovery patterns:
- **Acknowledge and Pivot** — When the bot doesn't understand, it names what it heard and offers a clarifying path ("I'm hearing you want to change your flight date—is that right?")
- **Gradual Escalation** — If simple clarification fails, offer structured options rather than asking for free-form input again
- **Warm Handoff** — If the bot can't resolve it, explain why and hand off with all context the agent needs

No dialogue state was treated as a "failure state." Every repair was part of the conversation design.

### 4. **Specialization Over Generality**

Instead of building one omniscient agent, we created focused agents for specific intents:
- Booking status queries
- Refund inquiries
- Voluntary changes & cancellations
- Baggage allowance
- FAQ deflection

Each agent had only the tools and knowledge it needed. Specialization dramatically reduced hallucinations (zero in our internal system vs. 3.5% in the vendor system).

### 5. **Context Passing, Not Just Call Routing**

The most critical design decision: the bot doesn't just transfer customers to agents. Before handoff, it builds a detailed context summary: what was asked, what authentication succeeded, booking information, what was already tried; and sends it to the agent's queue.

When a human picks up, they know exactly where the conversation left off. No restart. No repeated questions. The dialogue simply continues, with a human taking over where the bot couldn't go further.

---

## Results

**By May 2026** (5 months post-MVP launch), across 12.5k tracked calls:

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| **Transfer Rate (Overall)** | 16.9% | 15.4% | ↓ 8.9% |
| **Authentication Rate** | 33.1% | 55% | ↑ 65.8% |


**User Experience:**
- Average conversation duration: 1min 24sec (intent recognition + resolution)
- Intent classification accuracy: 72–100% by language (EN leading)
- Customers completed 6.6% of complex queries autonomously (early booking confirmation agent)

---

## Insights

### 1. **Tone is Architecture**

Personality isn't the last thing you add before ship, it's a structural design decision. It shapes which information you gather first, how you phrase questions, how you handle errors, and what the customer feels throughout. Different personas should have measurably different conversation flows and different success metrics.

### 2. **Handoff Design Matters as Much as Automation**

The real value wasn't "bots handling everything." It was bots preparing the ground so that when a human stepped in, they could actually help—not restart.

Design for the agent as much as the customer. Dialogue systems should be passing context, not just transferring calls.

### 3. **Specialization Reduces Hallucinations**

A single "general" agent trying to handle refunds, bookings, and baggage is a hallucination waiting to happen. Focused agents with narrow scope outperform. This is a design principle, not just an engineering one.

### 4. **Temporal Design Requires Different Skills**

Designing for voice/chat is categorically different from screen design. Pixels give you space to show options. Dialogue gives you time to build them in turns. Scripts, emotional arcs, and dialogue states become your core design artifacts, not wireframes.

### 5. **Test the Repair Paths, Not Just the Happy Path**

The best conversational experiences fail gracefully. What happens when the bot is confused? When the user says something unexpected? When the system can't authenticate? The repair paths are where personality either holds together or breaks down.