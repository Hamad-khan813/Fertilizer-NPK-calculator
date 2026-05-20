export const metadata = {
  title: 'How to Use the NPK Calculator — User Guide',
  description: 'Step-by-step guide on how to use the FertiCalc NPK fertilizer calculator to get accurate results.',
};

export default function UserGuide() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary/5 to-primary-20/40 py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">How to Use the NPK Calculator</h1>
          <p className="text-lg text-slate-600">
            Follow these steps to calculate the exact amount of fertilizer needed for your target NPK ratio.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
        {/* Step-by-Step Section */}
        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Step-by-Step Guide</h2>
          <div className="space-y-6">
            {/* Step 1 */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Enter Your Target N%</h3>
                  <p className="text-slate-700">
                    N stands for nitrogen, expressed as elemental percentage. This is the amount of nitrogen you want to deliver to your crop.
                    For example, wheat typically needs around 1.5% nitrogen for optimal growth. Check your soil test report or crop recommendations for the appropriate target.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Enter Target P% (as P₂O₅)</h3>
                  <p className="text-slate-700">
                    P is expressed as P₂O₅ (phosphorus pentoxide), the standard agronomic form used on fertilizer labels and soil test reports.
                    This represents the phosphorus content you want to deliver. Phosphorus is crucial for root development and early plant growth.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Enter Target K% (as K₂O)</h3>
                  <p className="text-slate-700">
                    K is expressed as K₂O (potassium oxide), which is what you'll see on fertilizer bag labels. This represents the potassium content
                    you want to deliver. Potassium helps with plant vigor, disease resistance, and stress tolerance.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Set Your Volume</h3>
                  <p className="text-slate-700">
                    Enter the volume in litres of water or solution where the fertilizer will be dissolved or applied. This could be the volume
                    of your fertigation tank, spray solution, or irrigation water. The default is 1 litre, but adjust based on your application method.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 5 */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">
                  5
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Select Fertilizer and Calculate</h3>
                  <p className="text-slate-700">
                    Choose your fertilizer from the dropdown menu, which is organized by category (nitrogen, phosphorus, potassium, compound).
                    Click the "Calculate" button. The result will show you exactly how much fertilizer to use (in grams for granular or ml for liquid)
                    plus the actual NPK percentages that will be delivered.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Understanding Results */}
        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Understanding Your Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-3">Amount to Use</h3>
              <p className="text-slate-700 text-sm">
                Shows grams for granular fertilizers or ml for liquid fertilizers. This is the exact amount needed to achieve your target NPK ratio.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-3">Actual NPK Delivered</h3>
              <p className="text-slate-700 text-sm">
                May differ slightly from your targets because one fertilizer cannot always perfectly match all three nutrients simultaneously.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-3">Warning Messages</h3>
              <p className="text-slate-700 text-sm">
                Appear when the selected fertilizer cannot supply one of your requested nutrients. Consider blending with another fertilizer.
              </p>
            </div>
          </div>
        </section>

        {/* Tips Box */}
        <section>
          <div className="bg-primary-20/10 border border-primary/20 rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">💡 Practical Tips</h2>
            <ul className="space-y-3 text-slate-700">
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span>If you only need nitrogen, set your P and K targets to 0 to avoid unnecessary warnings.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span>For fertigation systems, liquid fertilizers provide better results and more precise application.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span>When a warning appears, use a second fertilizer to cover the missing nutrient (e.g., add potassium fertilizer).</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span>Always cross-check your results with your soil test report before applying fertilizer to your crops.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* FAQ Section */}
        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-2">What does P₂O₅ mean?</h3>
              <p className="text-slate-700">
                P₂O₅ (phosphorus pentoxide) is the standard way phosphorus content is expressed in fertilizers and soil tests.
                It's not the same as elemental phosphorus — P₂O₅ contains about 43.7% elemental phosphorus.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-2">My result shows a warning — what do I do?</h3>
              <p className="text-slate-700">
                This means the selected fertilizer cannot supply one of your target nutrients. Use a blended approach with two fertilizers.
                For example, if your fertilizer lacks potassium, add a potassium-only fertilizer to your mix.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-2">Can I use this for drip irrigation?</h3>
              <p className="text-slate-700">
                Yes! Select liquid fertilizers for best results in fertigation systems. The calculator will show amounts in ml,
                which is perfect for mixing into your irrigation water.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-2">Is this calculator free?</h3>
              <p className="text-slate-700">
                Yes, FertiCalc is completely free to use. No account required, no limits, no ads. We believe accurate fertilizer
                calculation should be accessible to all farmers and agronomists.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <a
            href="/?scroll=calculator"
            className="inline-block bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg px-8 py-4 transition-colors text-lg"
          >
            Go to Calculator →
          </a>
        </section>
      </div>
    </div>
  );
}
