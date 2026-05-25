import { escapeHtml } from './escape-html.js';

export function renderInlineContent(segments) {
  if (!segments) return '';
  if (typeof segments === 'string') return escapeHtml(segments);

  return segments
    .map((segment) => {
      if (segment.type === 'break') {
        return '<br />';
      }

      const html = escapeHtml(segment.value ?? '');

      switch (segment.type) {
        case 'strong':
          return `<strong>${html}</strong>`;
        case 'em':
          return `<em>${html}</em>`;
        default:
          return html;
      }
    })
    .join('');
}

export function renderLabel(label) {
  if (!label) return '';
  if (typeof label === 'string') return escapeHtml(label);
  return renderInlineContent(label);
}

export function renderList(items, className = 'case-study-list') {
  if (!items?.length) return '';

  return `
    <ul class="${className}">
      ${items
        .map(
          (item) => `
        <li class="case-study-list__item">${renderInlineContent(item)}</li>
      `
        )
        .join('')}
    </ul>
  `;
}

export function renderTable(table) {
  if (!table?.headers?.length) return '';

  const head = table.headers
    .map(
      (cell) => `
      <th scope="col" class="case-study-table__cell case-study-table__cell--head">
        ${renderInlineContent(cell)}
      </th>
    `
    )
    .join('');

  const body = (table.rows ?? [])
    .map(
      (row) => `
      <tr class="case-study-table__row">
        ${row
          .map(
            (cell) => `
          <td class="case-study-table__cell">${renderInlineContent(cell)}</td>
        `
          )
          .join('')}
      </tr>
    `
    )
    .join('');

  return `
    <div class="case-study-table-wrap">
      <table class="case-study-table">
        <thead>
          <tr class="case-study-table__row">${head}</tr>
        </thead>
        <tbody>${body}</tbody>
      </table>
    </div>
  `;
}

export function renderBlocks(blocks, textClass = 'case-study-block__text') {
  if (!blocks?.length) return '';
  return blocks.map((block) => renderBlock(block, textClass)).join('');
}

function renderBlock(block, textClass) {
  switch (block.type) {
    case 'paragraph':
      return `<p class="${textClass}">${renderInlineContent(block.content)}</p>`;
    case 'list':
      return renderList(block.items);
    case 'table':
      return renderTable(block);
    case 'labeled':
      return renderLabeledBlock(block, textClass);
    default:
      return '';
  }
}

function renderLabeledBlock(block, textClass) {
  const body = block.list
    ? renderList(block.list)
    : `<p class="${textClass}">${renderInlineContent(block.content)}</p>`;

  return `
    <div class="case-study-labeled">
      <p class="case-study-labeled__label">${renderLabel(block.label)}</p>
      <div class="case-study-labeled__body">${body}</div>
    </div>
  `;
}

export function renderSectionContent(section, textClass = 'case-study-block__text') {
  const blocksHtml = section.blocks ? renderBlocks(section.blocks, textClass) : '';
  const legacyParagraphs =
    section.paragraphs
      ?.map((paragraph) => {
        const content = typeof paragraph === 'string' ? paragraph : paragraph;
        if (typeof content === 'string') {
          return `<p class="${textClass}">${escapeHtml(content)}</p>`;
        }
        return `<p class="${textClass}">${renderInlineContent(content)}</p>`;
      })
      .join('') ?? '';

  return `${blocksHtml}${legacyParagraphs}`;
}

export function renderSubsectionContent(subsection, textClass = 'case-study-subsection__text') {
  if (subsection.blocks) {
    return renderBlocks(subsection.blocks, textClass);
  }

  return (
    subsection.paragraphs
      ?.map((paragraph) => `<p class="${textClass}">${escapeHtml(paragraph)}</p>`)
      .join('') ?? ''
  );
}
