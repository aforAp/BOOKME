import {useState, useMemo, useEffect} from "react";
import { productP3 } from "../assets/images";
import {Link} from "react-router-dom";
import AppLayout from "../components/AppLayout";
import { getPaymentOverview, requestWithdrawal, updatePayoutDetails } from "../api/payment";
import {Wallet, TredingUp, Clock, ArrowDownToLine, Building2, CreditCard, Save, ExternalLink, Sprakles, IndianRupee, ArrowUpRight, ArrowDownLeft} from "lucide-react";
import { paymentsPageStyles as s } from "../assets/dummyStyles";


const formatMoney = (amount = 0, currency = "INR") => {
    new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency
    }).format(amount /100);

    const transactionLabel = (transaction) => {
        if(transaction.type === "booking_payment") {
            if(transaction.description && transaction.description.includes("Booking payout for stripe session")) {
                return "Booking payment received"
            }
        return transaction.description || "Booking payout";
        }

        if(transaction.type === "withdrawal_hold") return "Withdrawal requested";
        if(transaction.type === "withdrawal_reversal") return "Withdrawal returned";
        if(transaction.description && transaction.description.includes("Booking payout for stripe session")) return "Booking payment received";

        return transaction.description || transaction.type;
    }

};

const transactionAmount = (transaction) => {
    if(transaction.type === "withdrawal_hold") {
        return Math.abs(transaction.amount || 0);
    }
    return transaction.amount || 0;
}


export default function PaymentsPage()