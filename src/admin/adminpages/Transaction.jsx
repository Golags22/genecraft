import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../../database/firebase";
import Sidebar from "./Sidebar";
import { 
  FaReceipt, 
  FaFilter, 
  FaDownload, 
  FaSearch, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaClock,
  FaEye,
  FaSortAmountDown,
  FaSortAmountUp,
  FaCreditCard,
  FaUsers,
  FaChartLine,
  FaMoneyBillWave
} from "react-icons/fa";

export default function Transaction() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("desc");
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    failed: 0,
    totalAmount: 0
  });

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const q = query(
          collection(db, "transactions"),
          orderBy("createdAt", "desc")
        );

        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => {
          const docData = doc.data();
          return {
            id: doc.id,
            ...docData,
            createdAt: docData.createdAt?.toDate() || new Date()
          };
        });

        setTransactions(data);
        calculateStats(data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const calculateStats = (data) => {
    const stats = {
      total: data.length,
      completed: 0,
      pending: 0,
      failed: 0,
      totalAmount: 0
    };

    data.forEach(tx => {
      stats.totalAmount += Number(tx.amount) || 0;
      
      switch(tx.status?.toLowerCase()) {
        case 'completed':
        case 'success':
          stats.completed++;
          break;
        case 'pending':
          stats.pending++;
          break;
        case 'failed':
        case 'cancelled':
          stats.failed++;
          break;
      }
    });

    setStats(stats);
  };

  const filteredTransactions = transactions.filter(tx => {
    const matchesSearch = searchTerm === "" || 
      tx.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.userId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.courseId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.amount?.toString().includes(searchTerm);
    
    const matchesStatus = statusFilter === "all" || 
      tx.status?.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  }).sort((a, b) => {
    if (sortOrder === "desc") {
      return b.createdAt - a.createdAt;
    } else {
      return a.createdAt - b.createdAt;
    }
  });

  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'completed':
      case 'success':
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case 'pending':
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case 'failed':
      case 'cancelled':
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400";
    }
  };

  const getStatusIcon = (status) => {
    switch(status?.toLowerCase()) {
      case 'completed':
      case 'success':
        return <FaCheckCircle className="w-4 h-4" />;
      case 'pending':
        return <FaClock className="w-4 h-4" />;
      case 'failed':
      case 'cancelled':
        return <FaTimesCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount || 0);
  };

  const handleExport = () => {
    const csv = [
      ["ID", "User Full Name", "User ID", "Course ID", "Amount", "Status", "Date"],
      ...filteredTransactions.map(tx => [
        tx.id,
        tx.fullName || "N/A",
        tx.userId || "N/A",
        tx.courseId || "N/A",
        `$${tx.amount || 0}`,
        tx.status || "N/A",
        formatDate(tx.createdAt)
      ])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transactions_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="flex">
        <Sidebar />
        
        <div className="flex-1 p-4 sm:p-6 lg:p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
                    <FaReceipt className="w-6 h-6 text-white" />
                  </div>
                  Transaction Management
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  Monitor and manage all payment transactions
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <button
                  onClick={handleExport}
                  className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <FaDownload className="w-4 h-4" />
                  <span className="hidden sm:inline">Export CSV</span>
                </button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <FaReceipt className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stats.total}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Transactions</p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <FaCheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stats.completed}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                    <FaClock className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stats.pending}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Pending</p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                    <FaTimesCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                  </div>
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stats.failed}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Failed</p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                    <FaMoneyBillWave className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    {formatCurrency(stats.totalAmount)}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Revenue</p>
              </div>
            </div>

            {/* Filters and Search */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-5 mb-6">
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                {/* Search */}
                <div className="flex-1 relative">
                  <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search transactions by name, ID, or amount..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  />
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-3">
                  {/* Status Filter */}
                  <div className="relative">
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="appearance-none pl-10 pr-8 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    >
                      <option value="all">All Status</option>
                      <option value="completed">Completed</option>
                      <option value="pending">Pending</option>
                      <option value="failed">Failed</option>
                    </select>
                    <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  </div>

                  {/* Sort Order */}
                  <button
                    onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
                    className="flex items-center gap-2 px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  >
                    {sortOrder === "desc" ? (
                      <FaSortAmountDown className="w-4 h-4" />
                    ) : (
                      <FaSortAmountUp className="w-4 h-4" />
                    )}
                    <span>Sort by Date</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Transactions Table */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            {loading ? (
              <div className="p-12 text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent mb-4"></div>
                <p className="text-gray-600 dark:text-gray-400">Loading transactions...</p>
              </div>
            ) : filteredTransactions.length === 0 ? (
              <div className="p-12 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                  <FaReceipt className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  No transactions found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                  {searchTerm || statusFilter !== "all" 
                    ? "Try adjusting your search or filter criteria" 
                    : "No transactions have been recorded yet"}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700/50">
                    <tr>
                      <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                        Transaction
                      </th>
                      <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                        User
                      </th>
                      <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                        Course
                      </th>
                      <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredTransactions.map((tx) => (
                      <tr key={tx.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                        <td className="py-4 px-6">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center mr-3">
                              <FaCreditCard className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900 dark:text-white">
                                {tx.id.substring(0, 8)}...
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                Transaction
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">
                              {tx.fullName || "N/A"}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {tx.userId?.substring(0, 12)}...
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 rounded-full text-sm font-medium">
                            {tx.courseId || "N/A"}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="font-bold text-gray-900 dark:text-white">
                            {formatCurrency(tx.amount)}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${getStatusColor(tx.status)}`}>
                            {getStatusIcon(tx.status)}
                            <span className="capitalize">{tx.status || "Unknown"}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="text-gray-900 dark:text-white">
                            {formatDate(tx.createdAt)}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {new Date(tx.createdAt).toLocaleTimeString('en-US', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                            <FaEye className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Pagination/Info */}
          {!loading && filteredTransactions.length > 0 && (
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-600 dark:text-gray-400">
              <div>
                Showing <span className="font-semibold text-gray-900 dark:text-white">{filteredTransactions.length}</span> of{" "}
                <span className="font-semibold text-gray-900 dark:text-white">{transactions.length}</span> transactions
              </div>
              <div className="flex items-center gap-2 mt-3 sm:mt-0">
                <button className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed">
                  Previous
                </button>
                <span className="px-3 py-2 bg-blue-600 text-white rounded-lg font-medium">1</span>
                <button className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed">
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}