import React, { useState, useRef, useEffect } from 'react';
import { Calendar, Clock, Tag, ExternalLink, Loader2, BookOpen, ArrowLeft } from 'lucide-react';

const BlogPage = () => {
  const [filter, setFilter] = useState('All');
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSticky, setIsSticky] = useState(false);
  const titleRef = useRef(null);

  const filters = ['All', 'Recent', 'Featured', 'Technology', 'Design', 'Development'];

  // Fetch blog posts from Blogger API
  useEffect(() => {
    fetchBlogPosts();
  }, []);

  // Sticky header effect for individual blog view
  useEffect(() => {
    if (!selectedBlog) return;

    const handleScroll = () => {
      if (titleRef.current) {
        const titleTop = titleRef.current.getBoundingClientRect().top;
        setIsSticky(titleTop <= 50); // 50px is the nav height from CSS
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [selectedBlog]);

  const fetchBlogPosts = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get API credentials from environment variables or direct assignment
      const apiKey = import.meta.env?.VITE_BLOGGER_API_KEY || 'YOUR_BLOGGER_API_KEY';
      const blogId = import.meta.env?.VITE_BLOGGER_ID || 'YOUR_BLOG_ID';

      console.log('API Key:', apiKey ? (apiKey.length > 10 ? 'Present' : 'Invalid/Placeholder') : 'Missing');
      console.log('Blog ID:', blogId ? (blogId.length > 10 ? 'Present' : 'Invalid/Placeholder') : 'Missing');

      // Check if we have valid API credentials
      if (!apiKey || !blogId ||
        apiKey === 'YOUR_BLOGGER_API_KEY' ||
        blogId === 'YOUR_BLOG_ID' ||
        apiKey.length < 10 ||
        blogId.length < 10) {

        console.warn('Invalid or missing Blogger API credentials. Using demo data.');

        const demoData = await fetchDemoData();
        setPosts(demoData);
        setError('Demo mode: Configure VITE_BLOGGER_API_KEY and VITE_BLOGGER_ID to use real blog data');
        return;
      }

      const url = `https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts?key=${apiKey}&maxResults=20&status=LIVE`;
      console.log('Fetching from Blogger API...');

      const response = await fetch(url);
      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`Blogger API Error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('Blogger API Response:', data);
      console.log('Posts found:', data.items ? data.items.length : 0);

      if (!data.items || data.items.length === 0) {
        console.warn('No posts found in Blogger API response');
        setError('No blog posts found. Check if your blog has published posts.');
        setPosts([]);
        return;
      }

      setPosts(data.items);
      console.log('Successfully loaded', data.items.length, 'posts from Blogger API');

    } catch (err) {
      console.error('Error fetching blog posts:', err);
      setError(`Failed to fetch blog posts: ${err.message}`);

      // Only fallback to demo data if it's a network/API error, not missing credentials
      if (!err.message.includes('Invalid or missing')) {
        console.log('Falling back to demo data due to API error');
        const demoData = await fetchDemoData();
        setPosts(demoData);
      } else {
        setPosts([]);
      }
    } finally {
      setLoading(false);
    }
  };

  // Demo data fallback
  const fetchDemoData = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=12');
    const postsData = await response.json();

    return postsData.map((post, index) => ({
      id: post.id,
      title: post.title.charAt(0).toUpperCase() + post.title.slice(1),
      content: post.body,
      published: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      url: `#post-${post.id}`,
      images: Math.random() > 0.3 ? [{
        url: `https://picsum.photos/400/240?random=${post.id}`
      }] : null,
      labels: [
        ['Technology', 'Programming', 'JavaScript'],
        ['Design', 'UI/UX', 'Web Design'],
        ['Development', 'Coding', 'Frontend']
      ][index % 3],
      author: {
        displayName: `Author ${(index % 3) + 1}`
      }
    }));
  };

  // Filter posts based on selected filter
  const getFilteredPosts = () => {
    if (!posts || posts.length === 0) return [];

    if (filter === 'All') return posts;
    if (filter === 'Recent') {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return posts.filter(post => new Date(post.published) > thirtyDaysAgo);
    }
    if (filter === 'Featured') {
      return posts.filter((post, index) => index < 3); // First 3 as featured
    }
    if (filter === 'Technology') {
      return posts.filter(post => {
        const content = ((post.title || '') + ' ' + (post.content || '') + ' ' + (post.labels || []).join(' ')).toLowerCase();
        return content.includes('tech') || content.includes('programming') || content.includes('code') || content.includes('javascript');
      });
    }
    if (filter === 'Design') {
      return posts.filter(post => {
        const content = ((post.title || '') + ' ' + (post.content || '') + ' ' + (post.labels || []).join(' ')).toLowerCase();
        return content.includes('design') || content.includes('ui') || content.includes('ux');
      });
    }
    if (filter === 'Development') {
      return posts.filter(post => {
        const content = ((post.title || '') + ' ' + (post.content || '') + ' ' + (post.labels || []).join(' ')).toLowerCase();
        return content.includes('development') || content.includes('coding') || content.includes('programming');
      });
    }
    return posts;
  };

  const filteredPosts = getFilteredPosts();

  // Utility functions
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const stripHtmlTags = (html) => {
    if (!html) return '';
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  const truncateText = (text, maxLength = 150) => {
    if (!text || text.length <= maxLength) return text || '';
    return text.substring(0, maxLength) + '...';
  };

  const truncateTitle = (title, maxWords = 8) => {
    if (!title) return '';
    const words = title.split(' ');
    if (words.length <= maxWords) return title;
    return words.slice(0, maxWords).join(' ') + '...';
  };

  const estimateReadTime = (content) => {
    const wordsPerMinute = 200;
    const wordCount = stripHtmlTags(content).split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min read`;
  };

  const handleBlogClick = (blog) => {
    setSelectedBlog(blog);
    setIsSticky(false);
  };

  const handleBackClick = () => {
    setSelectedBlog(null);
    setIsSticky(false);
  };

  // Individual blog view
  if (selectedBlog) {
    return (
      <div className="bg-black min-h-screen">
        {/* Sticky Header */}
        <div
          className={`${isSticky
              ? 'fixed top-[50px] left-0 right-0 z-40 bg-black/95 backdrop-blur-md border-b border-neutral-800'
              : 'hidden'
            } transition-all duration-300`}
        >
          <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-2 flex items-center justify-center gap-2">
            <button
              onClick={handleBackClick}
              className="flex-shrink-0 text-blue-400 hover:text-blue-300 transition-colors flex items-center justify-center"
              style={{ transform: 'translateY(1px)' }}
            >
              <ArrowLeft size={24} />
            </button>
            <div className="flex-1 min-w-0 flex items-center">
              <h2 className="text-lg font-semibold text-white break-words">
                {selectedBlog.title}
              </h2>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="pt-[0px]">
          <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-8">
            {/* Header Section with Back Button and Title */}
            <div ref={titleRef} className="mb-8">
              <div className="flex items-start gap-4">
                <button
                  onClick={handleBackClick}
                  className="flex-shrink-0 text-blue-400 hover:text-blue-300 transition-colors flex items-center justify-center mt-1"
                >
                  <ArrowLeft size={28} />
                </button>
                <div className="flex-1 min-w-0">
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight text-left">
                    {selectedBlog.title}
                  </h1>
                </div>
              </div>
            </div>

            {/* Blog Content Container */}
            <div className="max-w-4xl">
              {/* Blog image */}
              {selectedBlog.images && selectedBlog.images[0] && (
                <div className="mb-8">
                  <img
                    src={selectedBlog.images[0].url}
                    alt={selectedBlog.title}
                    className="w-full h-48 md:h-64 lg:h-96 object-cover rounded-lg"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                </div>
              )}

              {/* Blog metadata */}
              <div className="mb-8">
                <div className="flex flex-wrap items-center gap-4 text-neutral-400 text-sm mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar size={16} />
                    {formatDate(selectedBlog.published)}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={16} />
                    {estimateReadTime(selectedBlog.content)}
                  </div>
                  {selectedBlog.labels && selectedBlog.labels[0] && (
                    <div className="flex items-center gap-1">
                      <Tag size={16} />
                      {selectedBlog.labels[0]}
                    </div>
                  )}
                </div>

                {selectedBlog.author && (
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-neutral-300">By {selectedBlog.author.displayName || 'Anonymous'}</span>
                  </div>
                )}

                {selectedBlog.labels && (
                  <div className="flex flex-wrap gap-2">
                    {selectedBlog.labels.slice(0, 5).map(tag => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Blog content */}
              <div className="prose prose-invert prose-lg max-w-none">
                <div className="text-neutral-300 leading-relaxed text-base md:text-lg">
                  <div
                    dangerouslySetInnerHTML={{ __html: selectedBlog.content }}
                    className="space-y-4"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main blog list view
  return (
    <div className="bg-black min-h-screen">
      <div className="pt-[50px]">
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8 text-left">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">Blog</h2>
            <p className="text-neutral-300 text-sm md:text-base">Latest thoughts and insights</p>
          </div>

          {/* Filter Buttons - Simple Column Layout */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2">
              {filters.map((filterName) => (
                <button
                  key={filterName}
                  onClick={() => setFilter(filterName)}
                  className={`px-4 py-2 rounded-xl text-sm transition-all border backdrop-blur-sm hover:scale-105 ${
                    filter === filterName
                      ? 'bg-white/20 border-white/40 text-white font-semibold shadow-lg'
                      : 'bg-white/10 border-white/20 text-neutral-200 hover:bg-white/15 hover:border-white/30'
                  }`}
                  role="tab"
                  aria-selected={filter === filterName}
                  aria-label={`Filter by ${filterName} posts`}
                >
                  {filterName}
                </button>
              ))}
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="w-full text-center py-12">
              <div className="flex items-center justify-center space-x-3">
                <Loader2 className="animate-spin text-neutral-400" size={24} />
                <span className="text-neutral-400">Loading blog posts...</span>
              </div>
            </div>
          )}

          {/* Error/Debug State */}
          {error && (
            <div className="w-full text-center py-12">
              <div className="text-center max-w-md mx-auto px-4">
                <BookOpen className="mx-auto text-neutral-400 mb-4" size={48} />
                <h3 className="text-neutral-300 text-lg mb-2">
                  {error.includes('Demo mode') ? 'Demo Mode Active' : 'Unable to load blog posts'}
                </h3>
                <p className="text-neutral-400 text-sm mb-4">{error}</p>

                {/* Debug info */}
                <div className="text-xs text-neutral-500 mb-4 bg-neutral-900/50 p-3 rounded border text-left">
                  <p className="font-semibold mb-2">Debug Information:</p>
                  <p>Environment Variables:</p>
                  <p>• VITE_BLOGGER_API_KEY: {import.meta.env?.VITE_BLOGGER_API_KEY ? 'Set' : 'Not set'}</p>
                  <p>• VITE_BLOGGER_ID: {import.meta.env?.VITE_BLOGGER_ID ? 'Set' : 'Not set'}</p>
                  <p>Posts loaded: {posts.length}</p>
                  <p>Current filter: {filter}</p>
                  <p>Filtered posts: {filteredPosts.length}</p>
                </div>

                <button
                  onClick={fetchBlogPosts}
                  className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 transition-colors rounded text-neutral-200 text-sm"
                >
                  Retry Loading
                </button>
              </div>
            </div>
          )}

          {/* Blog List */}
          {!loading && !error && (
            <div className="w-full">
              {filteredPosts.length === 0 ? (
                <div className="w-full min-h-[300px] flex items-center justify-center">
                  <div className="text-center max-w-md mx-auto px-4">
                    <BookOpen className="mx-auto text-neutral-400 mb-4" size={48} />
                    <h3 className="text-neutral-300 text-lg mb-2">No blog posts found</h3>
                    <p className="text-neutral-400 text-sm">
                      {filter === 'All' ? 'Check back later for new content' : `No posts match the "${filter}" filter`}
                    </p>
                    <div className="mt-4 text-neutral-400 text-sm">
                      Found {posts.length} total post{posts.length !== 1 ? 's' : ''},
                      {filteredPosts.length} matching filter "{filter}"
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="mb-6 text-left">
                    <div className="text-neutral-400 text-sm">
                      Found {filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''}
                      {filter !== 'All' && ` (${filter} filter)`}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredPosts.map((post, index) => (
                      <article
                        key={post.id}
                        onClick={() => handleBlogClick(post)}
                        className="bg-neutral-800/50 border border-neutral-700 rounded-lg overflow-hidden cursor-pointer hover:bg-neutral-800/70 hover:border-neutral-600 transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-xl"
                      >
                        {post.images && post.images[0] && post.images[0].url && (
                          <div className="w-full h-48 overflow-hidden">
                            <img
                              src={post.images[0].url}
                              alt={post.title || 'Blog post'}
                              className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                              onError={(e) => {
                                e.target.style.display = 'none';
                              }}
                            />
                          </div>
                        )}

                        <div className="p-6">
                          <div className="flex items-center gap-2 text-sm text-neutral-400 mb-3">
                            <Calendar size={14} />
                            <span>{formatDate(post.published)}</span>
                            <span>•</span>
                            <Clock size={14} />
                            <span>{estimateReadTime(post.content)}</span>
                          </div>

                          <h3 className="text-lg md:text-xl font-semibold text-white mb-3 line-clamp-2 hover:text-blue-300 transition-colors">
                            {post.title || 'Untitled Post'}
                          </h3>

                          <p className="text-neutral-300 mb-4 line-clamp-3 leading-relaxed text-sm md:text-base">
                            {truncateText(stripHtmlTags(post.content))}
                          </p>

                          <div className="flex items-center justify-between">
                            <div className="flex flex-wrap gap-1">
                              {post.labels && post.labels.slice(0, 2).map(label => (
                                <span
                                  key={label}
                                  className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs"
                                >
                                  {label}
                                </span>
                              ))}
                            </div>

                            {index < 3 && filter === 'Featured' && (
                              <span className="px-2 py-1 bg-yellow-500/20 text-yellow-300 rounded text-xs">
                                Featured
                              </span>
                            )}
                          </div>

                          <div className="mt-4 pt-4 border-t border-neutral-700">
                            <span className="text-blue-400 text-sm flex items-center gap-1 hover:text-blue-300">
                              Read more
                              <ArrowLeft size={14} className="rotate-180" />
                            </span>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;