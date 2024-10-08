import { Helmet } from 'react-helmet-async'

import { CheckInsAmoutCard } from './check-ins-amout-card'
import { CustomerActiveChart } from './customers-active-chart'
import { CustomersAmoutCard } from './customers-amout-card'
import { MonthRevenueCard } from './month-revenue-card'
import { NotificationSheet } from './notification-sheet'
import { RevenueChart } from './revenue-chart'
import { ShippingsAmoutCard } from './shippings-amout-card'
import { TopTenCustomersListCard } from './top-ten-customers-list-card'

export function Dashboard() {
  return (
    <>
      <Helmet title="Dashboard" />
      <div className="flex flex-col gap-4">
        <div className="flex flex-row justify-between first-letter:gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard 1</h1>
          <NotificationSheet />
        </div>

        <div className="grid grid-cols-4 gap-4">
          <CustomersAmoutCard />
          <CheckInsAmoutCard />
          <ShippingsAmoutCard />
          <MonthRevenueCard />
        </div>
        <div className="grid grid-cols-12 gap-4">
          <CustomerActiveChart />
          <RevenueChart />
          <TopTenCustomersListCard />
        </div>
      </div>
    </>
  )
}
