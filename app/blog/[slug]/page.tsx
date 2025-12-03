import { generateSEOMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Breadcrumb } from "@/components/Breadcrumb";
import Link from "next/link";
import { getBlogPostBySlug, getAllBlogPosts } from "@/lib/blogData";
import { notFound } from "next/navigation";
import React from "react";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Article non trouvé",
    };
  }

  return generateSEOMetadata({
    title: post.title,
    description: post.excerpt,
    keywords: ["blog", "servido", post.category.toLowerCase()],
    url: `/blog/${post.slug}`,
    type: "article",
    publishedTime: post.date,
    author: post.author,
  });
}

function MarkdownContent({ content }: { content: string }) {
  const lines = content.split("\n");
  const elements: Array<React.ReactNode> = [];
  let currentParagraph: string[] = [];
  let inList = false;
  let listItems: string[] = [];
  let listType: "ul" | "ol" = "ul";

  const flushParagraph = () => {
    if (currentParagraph.length > 0) {
      const text = currentParagraph.join(" ");
      if (text.trim()) {
        elements.push(
          <p key={elements.length} className="text-gray-300 mb-4 leading-relaxed font-poppins">
            {parseInlineMarkdown(text)}
          </p>
        );
      }
      currentParagraph = [];
    }
  };

  const flushList = () => {
    if (listItems.length > 0) {
      const ListTag = listType === "ul" ? "ul" : "ol";
      elements.push(
        <ListTag
          key={elements.length}
          className={`${
            listType === "ul" ? "list-disc" : "list-decimal"
          } list-inside mb-4 space-y-2 text-gray-300 font-poppins ml-4`}
        >
          {listItems.map((item, idx) => (
            <li key={idx} className="mb-2">
              {parseInlineMarkdown(item.trim())}
            </li>
          ))}
        </ListTag>
      );
      listItems = [];
      inList = false;
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    if (trimmed.startsWith("# ")) {
      flushParagraph();
      flushList();
      elements.push(
        <h1
          key={elements.length}
          className="text-3xl font-semibold text-white mt-8 mb-4 font-poppins"
        >
          {trimmed.substring(2)}
        </h1>
      );
    } else if (trimmed.startsWith("## ")) {
      flushParagraph();
      flushList();
      elements.push(
        <h2
          key={elements.length}
          className="text-2xl font-semibold text-white mt-8 mb-4 font-poppins"
        >
          {trimmed.substring(3)}
        </h2>
      );
    } else if (trimmed.startsWith("### ")) {
      flushParagraph();
      flushList();
      elements.push(
        <h3
          key={elements.length}
          className="text-xl font-semibold text-white mt-6 mb-3 font-poppins"
        >
          {trimmed.substring(4)}
        </h3>
      );
    } else if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      flushParagraph();
      if (!inList) {
        listType = "ul";
        inList = true;
      }
      listItems.push(trimmed.substring(2));
    } else if (/^\d+\.\s/.test(trimmed)) {
      flushParagraph();
      if (!inList) {
        listType = "ol";
        inList = true;
      }
      listItems.push(trimmed.replace(/^\d+\.\s/, ""));
    } else if (trimmed === "") {
      flushParagraph();
      flushList();
    } else {
      if (inList) {
        flushList();
      }
      currentParagraph.push(line);
    }
  }

  flushParagraph();
  flushList();

  return <>{elements}</>;
}

function parseInlineMarkdown(text: string): React.ReactNode {
  const parts: (string | React.ReactElement)[] = [];
  let current = "";
  let i = 0;

  while (i < text.length) {
    if (text.substring(i, i + 2) === "**") {
      if (current) {
        parts.push(current);
        current = "";
      }
      const end = text.indexOf("**", i + 2);
      if (end !== -1) {
        parts.push(
          <strong key={parts.length} className="text-white font-semibold">
            {text.substring(i + 2, end)}
          </strong>
        );
        i = end + 2;
      } else {
        current += text[i];
        i++;
      }
    } else {
      current += text[i];
      i++;
    }
  }

  if (current) {
    parts.push(current);
  }

  return parts.map((part, idx) =>
    typeof part === "string" ? <span key={idx}>{part}</span> : part
  );
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <div className="bg-black pt-16 sm:pt-20 min-h-screen">
        {/* Texture en background */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.12) 1px, transparent 0)`,
            backgroundSize: "25px 25px",
            maskImage:
              "radial-gradient(ellipse at center, black 0%, black 20%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 0%, black 20%, transparent 100%)",
          }}
        ></div>

        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10 py-12 sm:py-16">
          {/* Breadcrumb */}
          <Breadcrumb
            items={[
              { label: "Accueil", href: "/" },
              { label: "Blog", href: "/blog" },
              { label: post.title.length > 50 ? post.title.substring(0, 50) + "..." : post.title },
            ]}
          />

          {/* En-tête de l'article */}
          <article className="bg-gray-950/50 border border-white/10 rounded-2xl p-6 sm:p-8 lg:p-12">
            {/* Catégorie et date */}
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs sm:text-sm font-medium rounded-full font-poppins">
                {post.category}
              </span>
              <span className="text-gray-400 text-xs sm:text-sm font-poppins">
                {post.date}
              </span>
            </div>

            {/* Titre */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white mb-6 leading-tight tracking-[-1.5px] sm:tracking-[-2px] font-poppins">
              {post.title}
            </h1>

            {/* Auteur */}
            <div className="flex items-center gap-3 mb-8 pb-8 border-b border-white/10">
              <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                <span className="text-blue-400 font-semibold text-sm">
                  {post.author.charAt(0)}
                </span>
              </div>
              <div>
                <p className="text-white font-medium font-poppins">
                  {post.author}
                </p>
                <p className="text-gray-400 text-sm font-poppins">{post.date}</p>
              </div>
            </div>

            {/* Contenu de l'article */}
            <div className="prose prose-invert prose-lg max-w-none">
              <div className="text-gray-300 leading-relaxed font-poppins">
                <MarkdownContent content={post.content} />
              </div>
            </div>
          </article>
        </div>
      </div>
      <Footer />
    </>
  );
}

