import { generateSEOMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Breadcrumb } from "@/components/Breadcrumb";
import Link from "next/link";
import { getAllBlogPosts } from "@/lib/blogData";

export const metadata: Metadata = generateSEOMetadata({
  title: "Blog",
  description: "Découvrez les dernières actualités, conseils et articles sur Servido et l'économie des services.",
  keywords: ["blog", "servido", "actualités", "conseils", "services", "freelance"],
  url: "/blog",
});

const blogPosts = getAllBlogPosts();

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <div className="bg-black pt-16 sm:pt-20 min-h-screen">
        {/* Texture en background */}
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.12) 1px, transparent 0)`,
          backgroundSize: '25px 25px',
          maskImage: 'radial-gradient(ellipse at center, black 0%, black 20%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 0%, black 20%, transparent 100%)'
        }}></div>
        
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 py-12 sm:py-16">
          {/* Breadcrumb */}
          <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Blog" }]} />
          
          {/* En-tête */}
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-4 sm:mb-6 leading-tight tracking-[-1.5px] sm:tracking-[-2px] font-poppins">
              <span className="text-white">Blog</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto font-poppins">
              Découvrez les dernières actualités, conseils et guides pour tirer le meilleur parti de Servido
            </p>
          </div>

          {/* Liste des articles */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8">
            {blogPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group bg-gray-950/50 border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10"
              >
                {/* Image de l'article */}
                <div className="relative w-full h-48 sm:h-56 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Contenu de l'article */}
                <div className="p-6 sm:p-8">
                  {/* Catégorie et date */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs sm:text-sm font-medium rounded-full font-poppins">
                      {post.category}
                    </span>
                    <span className="text-gray-400 text-xs sm:text-sm font-poppins">
                      {post.date}
                    </span>
                  </div>

                  {/* Titre */}
                  <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors duration-200 font-poppins leading-tight">
                    {post.title}
                  </h2>

                  {/* Extrait */}
                  <p className="text-gray-300 text-sm sm:text-base mb-4 line-clamp-3 font-poppins leading-relaxed">
                    {post.excerpt}
                  </p>

                  {/* Auteur et lien */}
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-xs sm:text-sm font-poppins">
                      Par {post.author}
                    </span>
                    <span className="text-blue-400 text-sm font-medium group-hover:text-blue-300 transition-colors duration-200 font-poppins flex items-center gap-1">
                      Lire la suite
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Message si aucun article */}
          {blogPosts.length === 0 && (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-white mb-3 font-poppins">
                Aucun article pour le moment
              </h3>
              <p className="text-gray-400 font-poppins">
                Revenez bientôt pour découvrir nos articles !
              </p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

