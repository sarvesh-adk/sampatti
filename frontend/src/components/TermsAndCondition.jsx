const TermsAndConditions = () => {
  return (
    <div className='bg-[#RF3B8Z] min-h-screen text-gray-100 p-8'>
      <div className='max-w-4xl mx-auto bg-gray-100 dark:bg-[#1E2939] rounded-xl shadow-lg p-6'>
        <h1 className='text-3xl font-bold text-[#FF6500] mb-4'>Terms & Conditions</h1>
        <p className='text-gray-600 dark:text-gray-100 mb-6'>
          Welcome to our platform. By using our services, you agree to comply with and be bound by the
          following terms and conditions.
        </p>

        <div className='space-y-6'>
          <section>
            <h2 className='text-xl font-semibold text-[#FF6500] mb-2'>1. Acceptance of Terms</h2>
            <p className='text-gray-600 dark:text-gray-100'>
              By accessing or using our services, you accept and agree to be bound by these terms.
            </p>
          </section>

          <section>
            <h2 className='text-xl font-semibold text-[#FF6500] mb-2'>2. User Responsibilities</h2>
            <p className='text-gray-600 dark:text-gray-100'>
              Users must provide accurate information and ensure their account security.
            </p>
          </section>

          <section>
            <h2 className='text-xl font-semibold text-[#FF6500] mb-2'>3. Privacy Policy</h2>
            <p className='text-gray-600 dark:text-gray-100'>
              We prioritize user privacy. Refer to our Privacy Policy for details on data handling.
            </p>
          </section>

          <section>
            <h2 className='text-xl font-semibold text-[#FF6500] mb-2'>4. Limitation of Liability</h2>
            <p className='text-gray-600 dark:text-gray-100'>
              We are not responsible for any indirect damages resulting from the use of our services.
            </p>
          </section>
        </div>

        {/* <div className='mt-8 text-center'>
          <button className='bg-[#FF6500] text-white px-6 py-2 rounded-lg shadow-md hover:bg-orange-700 transition-all duration-500'>
            Accept & Continue
          </button>
        </div> */}
      </div>
    </div>
  )
}

export default TermsAndConditions
