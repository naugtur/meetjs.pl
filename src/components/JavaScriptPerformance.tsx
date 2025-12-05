export const JavaScriptPerformance = () => {
  const benchmarks = [
    {
      metric: 'Parse Time (1MB JS)',
      year1995: '250ms',
      year2005: '120ms',
      year2015: '45ms',
      year2024: '8ms',
      improvement: '31x faster',
      description: 'How quickly browsers can parse JavaScript code',
    },
    {
      metric: 'Execution Speed',
      year1995: '1x baseline',
      year2005: '5x faster',
      year2015: '25x faster',
      year2024: '100x faster',
      improvement: '100x improvement',
      description: 'JavaScript engine performance optimizations',
    },
    {
      metric: 'Memory Usage',
      year1995: 'High',
      year2005: 'Moderate',
      year2015: 'Optimized',
      year2024: 'Minimal',
      improvement: '80% reduction',
      description: 'Memory efficiency improvements in JS engines',
    },
    {
      metric: 'Bundle Size (Hello World)',
      year1995: '5KB',
      year2005: '50KB',
      year2015: '200KB',
      year2024: '45KB (tree-shaken)',
      improvement: '4x smaller than peak',
      description: 'Modern bundling and tree-shaking efficiency',
    },
    {
      metric: 'First Contentful Paint',
      year1995: '3.5s',
      year2005: '2.8s',
      year2015: '1.9s',
      year2024: '0.8s',
      improvement: '4.4x faster',
      description: 'Time to render first content on screen',
    },
    {
      metric: 'DOM Manipulation',
      year1995: 'Slow',
      year2005: 'Improved',
      year2015: 'Fast',
      year2024: 'Instant',
      improvement: 'Virtual DOM revolution',
      description: 'Efficiency of updating web page elements',
    },
  ];

  const getProgressWidth = (current: string) => {
    // Simple visual representation of improvement
    const values: { [key: string]: number } = {
      '250ms': 10,
      '120ms': 25,
      '45ms': 60,
      '8ms': 100,
      '1x baseline': 10,
      '5x faster': 25,
      '25x faster': 60,
      '100x faster': 100,
      High: 20,
      Moderate: 40,
      Optimized: 70,
      Minimal: 100,
      '5KB': 80,
      '50KB': 40,
      '200KB': 10,
      '45KB (tree-shaken)': 90,
      '3.5s': 10,
      '2.8s': 20,
      '1.9s': 40,
      '0.8s': 100,
      Slow: 15,
      Improved: 35,
      Fast: 70,
      Instant: 100,
    };
    return values[current] || 50;
  };

  return (
    <section className="bg-gradient-to-b from-gray-900 to-black py-20 text-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-4xl font-extrabold text-transparent sm:text-5xl">
            JavaScript Performance Evolution
          </h2>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-300">
            From slow, interpreted scripts to blazing-fast optimized machine
            code. See how JavaScript performance has improved dramatically over
            30 years of innovation.
          </p>
        </div>

        {/* Performance Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {benchmarks.map((benchmark, index) => (
            <div
              key={index}
              className="rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 p-6 shadow-2xl ring-1 ring-gray-700"
            >
              <div className="mb-4">
                <h3 className="mb-2 text-xl font-bold text-white">
                  {benchmark.metric}
                </h3>
                <p className="text-sm text-gray-400">{benchmark.description}</p>
              </div>

              {/* Performance Timeline */}
              <div className="mb-6 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">1995</span>
                  <span className="font-mono text-sm text-red-400">
                    {benchmark.year1995}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">2005</span>
                  <span className="font-mono text-sm text-orange-400">
                    {benchmark.year2005}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">2015</span>
                  <span className="font-mono text-sm text-yellow-400">
                    {benchmark.year2015}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">2024</span>
                  <span className="font-mono text-sm text-green-400">
                    {benchmark.year2024}
                  </span>
                </div>
              </div>

              {/* Visual Progress Bar */}
              <div className="mb-4">
                <div className="h-2 rounded-full bg-gray-700">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 transition-all duration-1000"
                    style={{
                      width: `${getProgressWidth(benchmark.year2024)}%`,
                    }}
                  />
                </div>
              </div>

              {/* Improvement Badge */}
              <div className="flex items-center justify-center rounded-full bg-green-500/10 px-4 py-2">
                <span className="text-sm font-semibold text-green-400">
                  🚀 {benchmark.improvement}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Key Technologies Section */}
        <div className="mt-20">
          <div className="mb-12 text-center">
            <h3 className="mb-4 text-2xl font-bold text-white">
              Technologies That Revolutionized Performance
            </h3>
            <p className="text-gray-400">
              Key innovations that made JavaScript faster and more efficient
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl bg-gradient-to-br from-blue-600/20 to-blue-800/20 p-6 ring-1 ring-blue-500/30">
              <div className="mb-3 text-3xl">⚡</div>
              <h4 className="mb-2 font-bold text-blue-400">V8 Engine</h4>
              <p className="text-sm text-gray-300">
                2008: Google&apos;s V8 engine introduced JIT compilation, making
                JavaScript 10x faster overnight.
              </p>
            </div>

            <div className="rounded-xl bg-gradient-to-br from-green-600/20 to-green-800/20 p-6 ring-1 ring-green-500/30">
              <div className="mb-3 text-3xl">🌳</div>
              <h4 className="mb-2 font-bold text-green-400">Tree Shaking</h4>
              <p className="text-sm text-gray-300">
                2015: Eliminates unused code, reducing bundle sizes by up to
                80%.
              </p>
            </div>

            <div className="rounded-xl bg-gradient-to-br from-purple-600/20 to-purple-800/20 p-6 ring-1 ring-purple-500/30">
              <div className="mb-3 text-3xl">🔄</div>
              <h4 className="mb-2 font-bold text-purple-400">Virtual DOM</h4>
              <p className="text-sm text-gray-300">
                2013: React&apos;s Virtual DOM made UI updates 5-10x faster.
              </p>
            </div>

            <div className="rounded-xl bg-gradient-to-br from-orange-600/20 to-orange-800/20 p-6 ring-1 ring-orange-500/30">
              <div className="mb-3 text-3xl">🚀</div>
              <h4 className="mb-2 font-bold text-orange-400">WebAssembly</h4>
              <p className="text-sm text-gray-300">
                2017: Near-native performance in browsers, 20x faster for
                compute-heavy tasks.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-green-500/20 to-blue-500/20 px-6 py-3 text-sm text-green-400 ring-1 ring-green-500/30">
            <span>📈</span>
            <span>
              Performance improvements continue with every JavaScript engine
              update
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
