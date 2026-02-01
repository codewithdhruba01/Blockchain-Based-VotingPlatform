import React, { useState } from "react";
import { IconUser, IconMessageCircle, IconMinus, IconPlus } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
    {
        question: "What is BlockVote?",
        answer:
            "BlockVote is a decentralized voting platform powered by Ethereum blockchain technology. It ensures secure, transparent, and tamper-proof elections where every vote is verifiable and immutable.",
    },
    {
        question: "Who is BlockVote built for?",
        answer:
            "It is designed for organizations, governments, and communities that require a trustless and transparent voting mechanism. Whether it's a student council election, a corporate board vote, or a public referendum, BlockVote scales to verify results instantly.",
    },
    {
        question: "How does BlockVote work?",
        answer:
            "Admins create elections and register voters via smart contracts. Voters connect their crypto wallets (like MetaMask) to cast votes. Once cast, the vote is recorded on the blockchain and cannot be altered or deleted, ensuring 100% integrity.",
    },
    {
        question: "Is there a cost to vote?",
        answer:
            "Voting transactions require a small amount of gas fees (in ETH) to process on the blockchain. However, for private or test networks (like Sepolia or Hardhat), these costs are virtual and free for the user.",
    },
    {
        question: "How can I get help?",
        answer:
            "We provide comprehensive documentation and support. You can reach out to our support team via the contact form or join our community Discord server for real-time assistance.",
    },
];

const AccordionItem = ({ question, answer, isOpen, onClick }) => {
    return (
        <div
            onClick={onClick}
            className={`cursor-pointer rounded-2xl border px-6 py-4 transition-all duration-200 ${isOpen
                ? "bg-white border-primary-200 shadow-md ring-1 ring-primary-100"
                : "bg-white border-gray-200 hover:border-primary-200 hover:shadow-sm"
                }`}
        >
            <div className="flex items-center justify-between">
                <h3 className={`text-base font-medium md:text-lg transition-colors ${isOpen ? "text-primary-700" : "text-gray-900"}`}>
                    {question}
                </h3>
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors ${isOpen ? "bg-primary-100 text-primary-600" : "bg-gray-100 text-gray-500"
                    }`}>
                    {isOpen ? <IconMinus size={16} stroke={2.5} /> : <IconPlus size={16} stroke={2.5} />}
                </div>
            </div>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <p className="pt-3 text-sm leading-relaxed text-gray-600 md:text-base border-t border-gray-100 mt-3">
                            {answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export function FAQSection() {
    const [openIndex, setOpenIndex] = useState(0);

    return (
        <section className="bg-gray-50 px-4 py-20 md:px-8 lg:py-32">
            <div className="mx-auto max-w-3xl">
                {/* Header Icon */}
                <div className="mb-8 flex items-start justify-center md:justify-start">
                    <div className="relative">
                        <div className="h-12 w-12 rounded-2xl bg-primary-100 flex items-center justify-center text-primary-600 transform rotate-3">
                            <IconUser className="h-7 w-7" />
                        </div>
                        <div className="absolute -right-3 -top-3 h-8 w-8 rounded-full bg-white flex items-center justify-center shadow-md text-gray-400">
                            <IconMessageCircle className="h-5 w-5" />
                        </div>
                    </div>
                </div>

                {/* Title */}
                <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-5xl text-center md:text-left">
                    Frequently Asked Questions
                </h2>
                <p className="mb-12 text-lg text-gray-500 text-center md:text-left">
                    Everything you need to know about the platform and how it works.
                </p>

                {/* Accordion List */}
                <div className="flex flex-col gap-4">
                    {faqs.map((faq, index) => (
                        <AccordionItem
                            key={index}
                            question={faq.question}
                            answer={faq.answer}
                            isOpen={openIndex === index}
                            onClick={() => setOpenIndex(index === openIndex ? null : index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
