export default function Loading() {
  return (
    <section className="py-12 border-t border-gray-100 animate-pulse">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-6 bg-gray-100 rounded-full w-40" />
        <div className="h-5 bg-gray-100 rounded-full w-20" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-3">
            <div className="aspect-square bg-gray-100 rounded-2xl" />
            <div className="h-4 bg-gray-100 rounded-full w-3/4" />
            <div className="h-4 bg-gray-100 rounded-full w-1/2" />
          </div>
        ))}
      </div>
    </section>
  );
}
