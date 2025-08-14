import HeroSection from "@/components/shared/HeroSection";
import FloatingComp from "@/components/shared/FloatingComp";

export default function HomePage() {

  return (
    <main className="py-5 sm:py-10">

      {/* Floating Elements */}
      <FloatingComp />

      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      {/* <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative z-10 max-w-7xl mx-auto px-6 pb-32"
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Everything You Need to Blog
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Powerful features designed to help you create, publish, and grow
            your blog effortlessly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
            <Card className="h-full border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  Rich Editor
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Write with our intuitive editor featuring markdown support,
                  media embedding, and real-time collaboration.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
            <Card className="h-full border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  Grow Audience
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Built-in SEO tools, social sharing, and newsletter integration
                  to help you reach more readers.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
            <Card className="h-full border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Star className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  Analytics
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Track your performance with detailed analytics, reader
                  insights, and engagement metrics.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.section> */}

      {/* CTA Section */}
      {/* <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative z-10 max-w-4xl mx-auto px-6 pb-20"
      >
        <Card className="border-0 shadow-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white overflow-hidden">
          <CardContent className="p-12 text-center relative">
            <div className="absolute inset-0 bg-grid-white/10 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
            <div className="relative z-10">
              <h2 className="text-4xl font-bold mb-4">Ready to Start Your Blog?</h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Join thousands of writers who trust BlogCraft to share their stories with the world.
              </p>
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-semibold"
              >
                Create Your Blog Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.section> */}
    </main>
  );
}
