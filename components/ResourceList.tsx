import { resources } from "@/lib/resources";

export default function ResourceList() {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex flex-col gap-[80px]">
        {resources.map((resource) => (
          <div key={resource.id}>
            <p className="font-lab text-xs font-semibold uppercase tracking-[0.12em] text-softbrown mb-8">
              {resource.category}
            </p>
            <div className="border border-blush rounded-lg p-6 md:p-8 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5 hover:bg-gray-50/50 transition-colors">
              <div className="flex-1">
                <p className="font-lab text-base font-semibold text-espresso">
                  {resource.title}
                </p>
                <p className="font-lab text-sm font-normal text-coffee mt-2 leading-relaxed">
                  {resource.description}
                </p>
              </div>

              <a
                href={resource.fileUrl}
                download={resource.fileName}
                className="flex-shrink-0 font-lab text-xs font-semibold px-5 py-2 rounded-full border border-espresso text-espresso hover:opacity-70 transition-opacity"
              >
                Download
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
