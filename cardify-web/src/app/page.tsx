import Button from '../components/Button'

interface FeatureContent {
  title: string
  description: string
}

const features: FeatureContent[] = [
  {
    title: 'AI-Powered Flashcards',
    description:
      'Upload your PDFs or slides, and let our AI instantly convert them into easy-to-review flashcards. Study smarter by focusing on key points, and share or bookmark your flashcards for seamless collaboration and future use.'
  },

  {
    title: 'AI-Generated Quizzes',
    description:
      'Assess your knowledge with AI-generated quizzes crafted from your study materials. Upload your notes, and in seconds, Cardify creates customized quizzes. Share your quizzes with others or use them for self-assessment—perfect for exam prep and group study.'
  },
  {
    title: 'Sharable Study Resources',
    description:
      'Cardify makes studying collaborative with sharable flashcards and quizzes. Each comes with a unique link, making it easy to distribute study tools to classmates or access them later, ensuring you never study alone.'
  }
]

const FeatureCard = ({
  title,
  description
}: {
  title: string
  description: string
}) => (
  <div className='text-start'>
    <h2 className='mb-3  text-xl font-semibold'>{title}</h2>
    <p className='text-start text-text-secondary max-lg:max-w-[500px]'>
      {description}
    </p>
  </div>
)

export default function DashboardPage() {
  return (
    <div>
      <section className='flex flex-col items-center justify-center py-24'>
        <h1 className='text-center text-7xl font-extrabold leading-tight'>
          <span className='bg-span-bg bg-clip-text text-transparent'>
            Cardify
          </span>
          <br />
          The Smartest Way to Study
        </h1>
        <div className='my-6 px-20 text-center text-2xl text-text-secondary'>
          Transform Your Notes into Interactive Flashcards and Quizzes with AI{' '}
        </div>
        <div className='mt-4 flex flex-row gap-4'>
          <a href='' target='_blank'>
            <Button rounded size='large'>
              Get Started
            </Button>
          </a>
          <a href='https://github.com/Merwan-J/Cardify' target='_blank'>
            <Button rounded size='large' variant='secondary'>
              Learn More
            </Button>
          </a>
        </div>
      </section>
      <section className='bg-background-secondary py-20 max-lg:py-10'>
        <div className='grid w-full grid-cols-3 gap-7 px-8 py-5 max-lg:max-w-fit max-lg:grid-cols-1 max-lg:gap-10 md:px-24'>
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </section>
    </div>
  )
}
