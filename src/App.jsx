import { BrowserRouter,Routes,Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Loans from "./components/Loan";
import Insurance from "./components/Insurance";
import Payments from "./components/Payment";
import Support from "./components/Support";
import CryptoWallet from "./components/Cryptowallet";
import Navbar from "./components/Navbar";
import PeerTransfer from "./components/PeerTransfer";
import TransactionList from "./components/Transaction";
import LoginPage from "./components/Login";
import InsuranceApplication from "./insurance/application";
import InsurancePlans from "./insurance/plan";
import EnhancedLoanApplication from "./loan/loanapplication";
import LoanApplicationForm from "./loan/loanapplication";
import RegisterPage from "./components/Register";
import PeersTransfer from "./components/PeersTransfer";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
      <Navbar/>
        <main>
          <Routes>
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/loan" element={<Loans/>} />
            <Route path="/support" element={<Support/>} />
            <Route path="/wallet" element={<CryptoWallet/>} />
            <Route path="/payment" element={<Payments/>} />
            <Route path="/insurance" element={<Insurance/>} />
            <Route path="/transaction" element={<TransactionList/>} />
            <Route path="/peer" element={<PeerTransfer/>} />
            <Route path="/insuranceapplication" element={<InsuranceApplication/>} />
            <Route path="/plan" element={<InsurancePlans/>} />
            <Route path="/loanapplication" element={<LoanApplicationForm/>} />
            <Route path="/" element={<RegisterPage/>} />
            <Route path="/peers" element={<PeersTransfer/>} />
           </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;