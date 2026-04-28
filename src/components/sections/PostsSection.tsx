import { posts } from 'virtual:portfolio-posts';
import { uiText } from '../../content/ui';
import { getPostDetailHash, getSectionHash } from '../../lib/hashRouting';
import { MarkdownContent } from '../MarkdownContent';

type Post = (typeof posts)[number];

function formatPostDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');

  return `${year}.${month}.${day}`;
}

function getPostPreview(markdown: string) {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const paragraph: string[] = [];
  let inCodeBlock = false;

  for (const line of lines) {
    if (/^```/.test(line)) {
      inCodeBlock = !inCodeBlock;
      continue;
    }

    if (inCodeBlock) {
      continue;
    }

    if (paragraph.length > 0 && line.trim() === '') {
      break;
    }

    if (paragraph.length === 0 && (line.trim() === '' || /^(#{1,3})\s+/.test(line) || /^>\s?/.test(line))) {
      continue;
    }

    if (paragraph.length === 0 && (/^\s*[-*]\s+/.test(line) || /^\s*\d+\.\s+/.test(line))) {
      continue;
    }

    if (line.trim() !== '') {
      paragraph.push(line.trim());
    }
  }

  const preview = paragraph
    .join(' ')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/`([^`]+)`/g, '$1');

  return preview.length > 180 ? `${preview.slice(0, 177).trim()}...` : preview;
}

function PostMeta({ post }: { post: Post }) {
  return (
    <p className="meta">
      {uiText.lastUpdated}: {formatPostDate(post.lastModified)}
    </p>
  );
}

function PostsIndex() {
  if (posts.length === 0) {
    return <p>{uiText.noPosts}</p>;
  }

  return (
    <div className="posts post-list">
      {posts.map((post) => (
        <article key={post.slug} className="post-card post-list-card" id={`post-${post.slug}`}>
          <header className="post-header">
            <h3>{post.title}</h3>
            <PostMeta post={post} />
          </header>
          <p className="post-preview">{getPostPreview(post.body)}</p>
          <div className="project-actions">
            <a href={getPostDetailHash(post.slug)} className="btn-secondary">
              {uiText.readPost}
            </a>
          </div>
        </article>
      ))}
    </div>
  );
}

function PostDetail({ post }: { post: Post }) {
  return (
    <article className="post-card post-detail-card">
      <a href={getSectionHash('posts')} className="btn-secondary post-back-link">
        {uiText.backToPosts}
      </a>
      <header className="post-header">
        <h3>{post.title}</h3>
        <PostMeta post={post} />
      </header>
      <MarkdownContent markdown={post.body} />
    </article>
  );
}

function MissingPost() {
  return (
    <div className="post-card post-detail-card">
      <p className="meta">{uiText.postNotFound}</p>
      <a href={getSectionHash('posts')} className="btn-secondary post-back-link">
        {uiText.backToPosts}
      </a>
    </div>
  );
}

export function PostsSection({ requestedSlug = null }: { requestedSlug?: string | null }) {
  const selectedPost = requestedSlug ? posts.find((post) => post.slug === requestedSlug) ?? null : null;

  return (
    <section id="posts" className="section">
      <h2>{uiText.posts}</h2>
      {requestedSlug ? selectedPost ? <PostDetail post={selectedPost} /> : <MissingPost /> : <PostsIndex />}
    </section>
  );
}
