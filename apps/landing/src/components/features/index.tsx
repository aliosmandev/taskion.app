
import { Container } from '@/components/Container'
import { features } from './features.constants'


export function Features() {
  return (
    <section
      id="features"
      aria-label="Features for building a portfolio"
      className="py-20 sm:py-32"
    >
      <Container>
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-3xl font-medium tracking-tight text-gray-900">
            Elevate Your Task Management
          </h2>
          <p className="mt-2 text-lg text-gray-600">
          With Taskion, efficiently manage and track your tasks, ensuring nothing falls through the cracks.
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 text-sm sm:mt-20 sm:grid-cols-2 md:gap-y-10 lg:max-w-none lg:grid-cols-3"
        >
          {features.map((feature) => (
            <li
              key={feature.name}
              className="rounded-2xl border border-gray-200 p-8 group"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 group-hover:bg-gray-200 transition-all duration-300">
                {feature.icon}
              </div>
              <h3 className="mt-6 font-semibold text-gray-900 group-hover:text-gray-600 transition-all duration-300">
                {feature.name}
              </h3>
              <p className="mt-2 text-gray-700 group-hover:text-gray-600 transition-all duration-300">
                {feature.description}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
