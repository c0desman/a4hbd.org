// src/app/(linktree)/facebook/page.js
import FacebookEmbed from '@/components/social/facebook';

export const metadata = {
  title: 'Follow Aid For Humanity on Facebook',
  description: 'Stay connected with our projects and updates. JazakAllahu khairan for your support.',
};

export default function FacebookPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10 text-center">
      <h3 className="text-2xl md:text-3xl font-semibold mt-20 mb-6">Follow Aid For Humanity on Facebook</h3>

      {/* Page Plugin (cover, timeline, Like/Follow) */}
      <FacebookEmbed variant="page" width={700} className="mx-auto" />

      {/* If you also want a separate Like button, you can add: */}
      {/* <div className="mt-8 flex justify-center">
        <FacebookEmbed variant="like" width={400} />
      </div> */}
    </main>
  );
}
