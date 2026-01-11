import { FaUserAlt, FaDollarSign } from 'react-icons/fa'
import { BsFillCartPlusFill, BsFillHouseDoorFill } from 'react-icons/bs'

const AdminStatistics = () => {
  return (
    <div>
      <div className='mt-12'>
        {/* small cards */}
        <div className='mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grow'>
          {/* Sales Card */}
          <div className='relative flex flex-col bg-clip-border rounded-xl bg-base-100 text-base-content shadow-md border border-base-300'>
            <div
              className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-primary to-secondary text-primary-content shadow-primary/40`}
            >
              <FaDollarSign className='w-6 h-6 text-primary-content' />
            </div>
            <div className='p-4 text-right'>
              <p className='block antialiased font-sans text-sm leading-normal font-normal text-base-content/70'>
                Total Revenue
              </p>
              <h4 className='block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-base-content'>
                $120
              </h4>
            </div>
          </div>
          {/* Total Orders */}
          <div className='relative flex flex-col bg-clip-border rounded-xl bg-base-100 text-base-content shadow-md border border-base-300'>
            <div
              className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-secondary to-primary text-primary-content shadow-secondary/40`}
            >
              <BsFillCartPlusFill className='w-6 h-6 text-primary-content' />
            </div>
            <div className='p-4 text-right'>
              <p className='block antialiased font-sans text-sm leading-normal font-normal text-base-content/70'>
                Total Orders
              </p>
              <h4 className='block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-base-content'>
                120
              </h4>
            </div>
          </div>
          {/* Total Plants */}
          <div className='relative flex flex-col bg-clip-border rounded-xl bg-base-100 text-base-content shadow-md border border-base-300'>
            <div
              className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-linear-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-pink-600 to-pink-400 text-white shadow-pink-500/40`}
            >
              <BsFillHouseDoorFill className='w-6 h-6 text-white' />
            </div>
            <div className='p-4 text-right'>
              <p className='block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600'>
                Total Plants
              </p>
              <h4 className='block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900'>
                120
              </h4>
            </div>
          </div>
          {/* Users Card */}
          <div className='relative flex flex-col bg-clip-border rounded-xl bg-base-100 text-base-content shadow-md border border-base-300'>
            <div
              className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-success to-success/80 text-white shadow-success/40`}
            >
              <FaUserAlt className='w-6 h-6 text-white' />
            </div>
            <div className='p-4 text-right'>
              <p className='block antialiased font-sans text-sm leading-normal font-normal text-base-content/70'>
                Total User
              </p>
              <h4 className='block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-base-content'>
                10
              </h4>
            </div>
          </div>
        </div>

        <div className='mb-4 grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3'>
          {/*Sales Bar Chart */}
          <div className='relative flex flex-col bg-clip-border rounded-xl bg-base-100 text-base-content shadow-md overflow-hidden xl:col-span-2 border border-base-300'>
            {/* Chart goes here.. */}
          </div>
          {/* Calender */}
          <div className=' relative flex flex-col bg-clip-border rounded-xl bg-base-100 text-base-content shadow-md overflow-hidden border border-base-300'>
            {/* Calender */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminStatistics
