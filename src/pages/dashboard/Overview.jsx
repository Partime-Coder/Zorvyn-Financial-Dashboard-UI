import React from 'react'
import { useSelector } from 'react-redux'
import { calculateDashboardStats } from '../../services/dashboardServices/statsServices'
import { TrendCard, InsightCard, TransactionsCard, UpcomingTransactionsCard, StatsCard } from '../../components'
import {
    MdAccountBalanceWallet,
    TbCashPlus,
    TbCashMinus
} from '../../assets/icons/reactIcons'

const CARD_STYLES = {
    balance: {
        bg: 'bg-indigo-500/10',
        text: 'text-indigo-400',
        icon: <MdAccountBalanceWallet size={18} />
    },
    income: {
        bg: 'bg-emerald-500/10',
        text: 'text-emerald-400',
        icon: <TbCashPlus size={18} />
    },
    expense: {
        bg: 'bg-red-500/10',
        text: 'text-red-400',
        icon: <TbCashMinus size={18} />
    }
}
function Overview() {
    const transactions = useSelector(state => state.transactions.items)
    const stats = calculateDashboardStats(transactions)

    return (
        <div className="p-4">
           
            <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-4">

                {/* LEFT COLUMN */}
                <div className="flex flex-col gap-4">
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <StatsCard
                            title="Balance"
                            value={stats.balance}
                            percentage={stats.balanceChange}
                            positive={stats.balanceChange >= 0}
                            icon={CARD_STYLES.balance}
                        />

                        <StatsCard
                            title="Income This Month"
                            value={stats.income}
                            percentage={stats.incomeChange}
                            positive={stats.incomeChange >= 0}
                            icon={CARD_STYLES.income}
                        />

                        <StatsCard
                            title="Expenses This Month"
                            value={stats.expense}
                            percentage={stats.expenseChange}
                            positive={stats.expenseChange <= 0}
                            icon={CARD_STYLES.expense}
                        />
                    </div>

                    
                    <TrendCard transactions={transactions} />

                    
                    <InsightCard transactions={transactions} />
                </div>

                
                <div className="flex flex-col gap-4">
                    <TransactionsCard transactions={transactions} />
                    <UpcomingTransactionsCard transactions={transactions} />
                </div>
            </div>
        </div>
    )
}

export default Overview