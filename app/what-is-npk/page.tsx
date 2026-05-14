export const metadata = {
  title: 'What Is NPK? A Complete Guide',
  description: 'Learn what NPK stands for, what N P K ratios mean, and how to choose the right fertilizer for your crop.',
};

export default function WhatIsNPK() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-green-50 to-green-100 py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">What Is NPK?</h1>
          <p className="text-lg text-gray-600">A complete guide to understanding plant nutrition</p>
        </div>
      </div>

      {/* Content */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Introduction */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Understanding NPK: The Foundation of Plant Nutrition</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Every fertilizer bag you see in a garden center or farm supply store displays three prominent numbers, like 10-20-10 or 15-5-15. These numbers are the NPK ratio, one of the most important concepts in agriculture and horticulture. Understanding what these numbers mean is the first step toward making smarter, more efficient fertilizer choices.
          </p>
        </section>

        {/* What Does NPK Stand For */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">What Does NPK Stand For?</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            NPK is an acronym for three essential macronutrients that every plant requires to grow:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-3">🌾 Nitrogen (N)</h3>
              <p className="text-gray-700">
                The first number. Drives vegetative growth, leaf color, and protein production. Essential for lush, green foliage.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-3">🌱 Phosphorus (P₂O₅)</h3>
              <p className="text-gray-700">
                The second number. Promotes root development, flowering, and fruit production. Critical for energy transfer.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-3">💪 Potassium (K₂O)</h3>
              <p className="text-gray-700">
                The third number. Improves plant vigor, disease resistance, and stress tolerance. Enhances overall plant health.
              </p>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed">
            The three numbers on a fertilizer label represent the <strong>percentage by weight</strong> of each nutrient. For example, a 20-10-10 fertilizer contains 20% nitrogen, 10% phosphorus (as P₂O₅), and 10% potassium (as K₂O). The remaining percentage is inert filler, water, or trace elements.
          </p>
        </section>

        {/* Reading the Label */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Read a Fertilizer Label</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Consider a bag labeled <strong>18-46-0</strong>:
          </p>

          <ul className="space-y-3 text-gray-700 mb-6 ml-4">
            <li><strong>18</strong> = 18% Nitrogen — supports strong vegetative growth</li>
            <li><strong>46</strong> = 46% Phosphorus (as P₂O₅) — excellent for root and flower development</li>
            <li><strong>0</strong> = 0% Potassium (as K₂O) — not supplied by this product</li>
          </ul>

          <p className="text-gray-700 leading-relaxed">
            This is typical of a <strong>starter fertilizer</strong> because it emphasizes phosphorus for early root development. A <strong>maintenance fertilizer</strong> like 10-10-10 provides balanced nutrition for general plant health. A <strong>flowering fertilizer</strong> like 5-20-20 provides less nitrogen but more phosphorus and potassium to encourage blooms.
          </p>
        </section>

        {/* Crop Requirements */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">NPK Requirements by Crop</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Different crops have different nutritional needs at different growth stages. Here's a quick reference:
          </p>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg border border-gray-200">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Crop</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">Growth Stage</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">Recommended NPK</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-3 text-sm font-medium text-gray-900">Wheat</td>
                  <td className="px-6 py-3 text-center text-sm text-gray-700">Tillering to Grain Fill</td>
                  <td className="px-6 py-3 text-center text-sm text-gray-700">15-10-15</td>
                  <td className="px-6 py-3 text-sm text-gray-700">Avoid excess N to prevent lodging</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-3 text-sm font-medium text-gray-900">Tomatoes</td>
                  <td className="px-6 py-3 text-center text-sm text-gray-700">Flowering & Fruiting</td>
                  <td className="px-6 py-3 text-center text-sm text-gray-700">10-20-20</td>
                  <td className="px-6 py-3 text-sm text-gray-700">Reduce N to encourage fruiting</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-3 text-sm font-medium text-gray-900">Lettuce</td>
                  <td className="px-6 py-3 text-center text-sm text-gray-700">Vegetative</td>
                  <td className="px-6 py-3 text-center text-sm text-gray-700">20-10-10</td>
                  <td className="px-6 py-3 text-sm text-gray-700">High N for lush foliage</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-3 text-sm font-medium text-gray-900">Potatoes</td>
                  <td className="px-6 py-3 text-center text-sm text-gray-700">Tuber Development</td>
                  <td className="px-6 py-3 text-center text-sm text-gray-700">10-10-20</td>
                  <td className="px-6 py-3 text-sm text-gray-700">Higher K for yield and disease resistance</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-3 text-sm font-medium text-gray-900">Turf Grass</td>
                  <td className="px-6 py-3 text-center text-sm text-gray-700">Maintenance</td>
                  <td className="px-6 py-3 text-center text-sm text-gray-700">15-5-10</td>
                  <td className="px-6 py-3 text-sm text-gray-700">Balanced with emphasis on N and K</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Deficiency Symptoms */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Recognize Nutrient Deficiencies</h2>

          <div className="space-y-6">
            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded">
              <h3 className="text-lg font-bold text-blue-900 mb-2">Nitrogen Deficiency</h3>
              <p className="text-blue-800">
                Yellowing of lower leaves, stunted growth, pale green color. Plants may appear weak and decline in productivity.
              </p>
            </div>

            <div className="bg-green-50 border-l-4 border-green-600 p-6 rounded">
              <h3 className="text-lg font-bold text-green-900 mb-2">Phosphorus Deficiency</h3>
              <p className="text-green-800">
                Poor root development, delayed flowering, weak seed set. Leaves may turn purple or reddish, especially in cool weather.
              </p>
            </div>

            <div className="bg-purple-50 border-l-4 border-purple-600 p-6 rounded">
              <h3 className="text-lg font-bold text-purple-900 mb-2">Potassium Deficiency</h3>
              <p className="text-purple-800">
                Scorched or burned leaf edges, weak stems, poor disease resistance. Fruit quality and yield decline significantly.
              </p>
            </div>
          </div>
        </section>

        {/* Best Practices */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Best Practices for Using NPK Fertilizers</h2>

          <ol className="space-y-4 text-gray-700 list-decimal list-inside">
            <li className="leading-relaxed">
              <strong>Conduct a soil test first.</strong> Know what your soil actually needs before applying fertilizer. Generic ratios may not match your specific conditions.
            </li>
            <li className="leading-relaxed">
              <strong>Match the ratio to the crop stage.</strong> Use high nitrogen for vegetative growth, higher phosphorus for root/flower crops, and balanced ratios for maintenance.
            </li>
            <li className="leading-relaxed">
              <strong>Apply at the right time.</strong> Preplant fertilizer gets incorporated into the soil. Top-dressing requires slower-release forms or immediate watering.
            </li>
            <li className="leading-relaxed">
              <strong>Consider split applications.</strong> Dividing nitrogen into two or three doses reduces loss and maximizes uptake, especially in sandy soils.
            </li>
            <li className="leading-relaxed">
              <strong>Monitor for deficiencies.</strong> Watch for visual symptoms and adjust your program in season if needed.
            </li>
            <li className="leading-relaxed">
              <strong>Account for organic matter.</strong> Compost and manure release nutrients slowly. Reduce synthetic fertilizer if you have high organic matter.
            </li>
          </ol>
        </section>

        {/* Conclusion */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">The Bottom Line</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            NPK ratios are not mysterious or intimidating — they're simply a recipe that tells you the nutritional composition of your fertilizer. By understanding what each number means and matching it to your crop's growth stage and soil conditions, you can:
          </p>
          <ul className="space-y-2 text-gray-700 mb-6 ml-4">
            <li>✓ Optimize yields and crop quality</li>
            <li>✓ Reduce fertilizer waste and costs</li>
            <li>✓ Protect your soil and environment</li>
            <li>✓ Build healthier, more resilient crops</li>
          </ul>
          <p className="text-gray-700 leading-relaxed">
            Start with a soil test, choose the right NPK ratio for your situation, and use our calculator to dial in exact application rates. Your plants — and your profits — will thank you.
          </p>
        </section>
      </article>
    </div>
  );
}
