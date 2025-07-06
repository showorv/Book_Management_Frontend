

export const Footer = () => {
  return (
    <footer className="w-full bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-t dark:border-gray-700">
      <div className="max-w-7xl w-full mx-auto px-4  sm:px-6 lg:px-8">

        <div className="border-t border-gray-300 dark:border-gray-700 py-7 text-center text-xs text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Book House. Built by Yousuf Showrov.
        </div>
      </div>
    </footer>
  )
}
