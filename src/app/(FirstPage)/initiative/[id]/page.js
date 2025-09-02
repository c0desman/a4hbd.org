'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';

// helper: strip HTML tags and truncate text
function cleanText(text, maxLength = 80) {
  if (!text) return '';
  const plain = text.replace(/<\/?[^>]+(>|$)/g, ''); // remove HTML tags
  return plain.length > maxLength ? plain.slice(0, maxLength) + '…' : plain;
}

export default function InitiativePage() {
  const { id } = useParams();
  const [initiative, setInitiative] = useState(null);
  const [projects, setProjects] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);

  const pageSize = 6;

  const fetchProjects = async (page = 1) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/projects?initiative=${id}&page=${page}&limit=${pageSize}`
      );

      // backend returns { projects, pagination }
      const { projects, pagination } = res.data;

      setProjects(projects || []);

      // initiative info can be taken from the first project’s initiatives array
      if (!initiative && projects?.length > 0) {
        setInitiative(projects[0].initiatives[0]);
      }

      setPagination(pagination);
    } catch (err) {
      console.error('Error fetching initiative projects:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchProjects(1);
  }, [id]);

  if (loading && !initiative) {
    return <div className="p-10 text-center text-gray-600">Loading initiative…</div>;
  }

  if (!initiative) {
    return <div className="p-10 text-center text-gray-600">No initiative found.</div>;
  }

  return (
    <main className="pt-20 text-gray-800">
      {/* Initiative header */}
      <section className="bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500 text-white overflow-x-hidden">
        <div className="max-w-screen-xl px-4 mx-auto pt-20 lg:pt-20 pb-5 mb-10 lg:pb-8 grid md:grid-cols-2 items-center gap-8">
        {/* Left: image */}
        {initiative.imagepath && (
          <div className="flex justify-center">
            <Image
              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${initiative.imagepath}`}
              alt={initiative.name}
              width={500}
              height={400}
              className="rounded-2xl shadow"
            />
          </div>
        )}

        {/* Right: text */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{initiative.name}</h1>
          <p className="text-gray-700">{initiative.description}</p>
        </div>
        </div>
      </section>

      {/* Projects list */}
      <section className="bg-gray-50">
        <div className="max-w-screen-xl px-4 mx-auto pt-10 lg:pt-15 pb-5 lg:pb-8">
          <h2 className="text-2xl font-bold mb-6">Associated Projects</h2>

          {loading ? (
            <p className="text-center text-gray-600">Loading projects…</p>
          ) : projects.length === 0 ? (
            <p className="text-center text-gray-600">No projects found for this initiative.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Link href="/projects/[id]" as={`/projects/${project.id}`} key={project.id}>
                    <div
                    key={project.id}
                    className="bg-white rounded-2xl shadow hover:shadow-lg transition p-4 flex flex-col"
                    >
                    {project.imagepath && (
                        <Image
                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${project.imagepath}`}
                        alt={project.title}
                        width={400}
                        height={250}
                        className="rounded-lg mb-4"
                        />
                    )}
                    <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
                    <p className="text-gray-600 text-sm">{cleanText(project.description)}</p>
                    </div>
                </Link>
              ))}
            </div>
          )}

          {/* Pagination */}
          {pagination?.totalPages > 1 && (
            <div className="flex justify-center mt-8 gap-2 flex-wrap">
              <button
                disabled={pagination.currentPage === 1}
                onClick={() => fetchProjects(pagination.currentPage - 1)}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              >
                Previous
              </button>

              {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => fetchProjects(page)}
                  className={`px-4 py-2 rounded ${
                    pagination.currentPage === page
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                disabled={pagination.currentPage === pagination.totalPages}
                onClick={() => fetchProjects(pagination.currentPage + 1)}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
