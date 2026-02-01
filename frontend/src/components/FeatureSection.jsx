import React from "react";
import { cn } from "../lib/utils";
import { IconPlus, IconClipboardCopy, IconFingerprint } from "@tabler/icons-react";

export function FeatureSection() {
    return (
        <section className="py-20 lg:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row items-start justify-between mb-16 gap-8">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 max-w-xl leading-tight tracking-tight">
                        Built for Decentralized <br className="hidden md:block" />
                        Voting That Needs <span className="text-primary-600">Trust.</span>
                    </h2>
                    <p className="text-lg text-gray-500 max-w-sm leading-relaxed">
                        The platform works inside your existing ecosystem, with built-in security, anonymity guardrails, and full transparency. Every vote is verifiable, every outcome immutable.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {items.map((item, i) => (
                        <FeatureCard
                            key={i}
                            title={item.title}
                            graphic={item.graphic}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

const FeatureCard = ({ title, graphic }) => {
    return (
        <div className="group relative rounded-3xl bg-gray-50 p-6 flex flex-col h-[400px] transition-all duration-300 hover:shadow-xl">
            {/* Graphic Area */}
            <div className="flex-1 w-full h-full relative overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100 mb-6 flex items-center justify-center p-4">
                <div className="absolute h-full w-full bg-white bg-dot-black/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)] pointer-events-none" />
                {graphic}
            </div>

            {/* Footer Area */}
            <div className="flex items-center justify-between mt-auto">
                <h3 className="text-xl font-bold text-gray-900 leading-tight max-w-[80%]">
                    {title}
                </h3>
                <button className="flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm transition-transform duration-200 group-hover:scale-110">
                    <IconPlus className="w-5 h-5 text-gray-600" stroke={2} />
                </button>
            </div>
        </div>
    );
};

// Graphics Components
const SecureVotingGraphic = () => (
    <div className="relative w-full h-full flex items-center justify-center z-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-primary-100 rounded-full blur-[50px] opacity-40"></div>
        <div className="relative z-10 bg-white p-5 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 w-[85%] transform -rotate-3 transition-transform duration-500 group-hover:rotate-0">
            <div className="flex items-center gap-2 mb-4">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
            </div>
            <div className="space-y-3">
                <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-primary-50 flex items-center justify-center">
                        <IconClipboardCopy className="w-4 h-4 text-primary-500" />
                    </div>
                    <div className="space-y-1.5 flex-1">
                        <div className="h-2 w-3/4 bg-gray-100 rounded-full"></div>
                        <div className="h-2 w-1/2 bg-gray-100 rounded-full"></div>
                    </div>
                </div>
                <div className="h-10 w-full bg-gray-50 rounded-lg flex items-center px-3 border border-gray-100 mt-2">
                    <span className="text-xs font-mono text-gray-500">Risk Analysis</span>
                    <span className="ml-auto bg-amber-100 text-amber-600 px-2 py-0.5 rounded text-[10px] font-medium">40s</span>
                </div>
            </div>
        </div>
    </div>
);

const LedgerGraphic = () => (
    <div className="relative w-full h-full flex flex-col items-center justify-center z-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-blue-50 rounded-full blur-[40px] opacity-30"></div>
        <div className="relative w-[80%] flex flex-col gap-3 transform rotate-6 group-hover:rotate-0 transition-transform duration-500">
            <div className="bg-white p-3 rounded-xl shadow-lg border border-gray-100 flex items-center gap-3 opacity-60 scale-95 translate-y-4">
                <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-[10px] text-green-600">✓</div>
                <div className="h-2 w-24 bg-gray-100 rounded-full"></div>
                <div className="ml-auto text-[10px] text-gray-400">10s</div>
            </div>
            <div className="bg-white p-3 rounded-xl shadow-lg border border-gray-100 flex items-center gap-3 opacity-80 scale-98 translate-y-2">
                <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-[10px] text-green-600">✓</div>
                <div className="h-2 w-32 bg-gray-100 rounded-full"></div>
                <div className="ml-auto text-[10px] text-gray-400">20s</div>
            </div>
            <div className="bg-white p-3 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 flex items-center gap-3 z-10">
                <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-[10px] text-white">✓</div>
                <div className="h-2 w-20 bg-gray-200 rounded-full"></div>
                <div className="ml-auto text-[10px] text-green-600 font-medium">Processing</div>
            </div>
        </div>
    </div>
);

const VerificationGraphic = () => (
    <div className="relative w-full h-full flex items-center justify-center z-20">
        <div className="absolute inset-0 bg-[radial-gradient(#22c55e_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.2] mask-image:radial-gradient(ellipse_at_center,black,transparent)]"></div>
        <div className="relative transition-transform duration-500 group-hover:scale-105">
            <div className="w-28 h-28 bg-white rounded-[2.5rem] shadow-xl border border-gray-200 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-green-50 opacity-50"></div>
                <IconFingerprint className="w-14 h-14 text-green-500 opacity-20 absolute" stroke={1.5} />
                <div className="relative z-10 w-12 h-16 border-2 border-green-500 rounded-b-2xl rounded-t-lg bg-green-100/50 flex items-center justify-center backdrop-blur-sm">
                    <IconFingerprint className="w-8 h-8 text-green-600" stroke={2} />
                </div>
            </div>
            <div className="absolute -bottom-3 -right-3 bg-white px-3 py-1.5 rounded-full shadow-lg border border-gray-100 text-xs font-bold text-gray-700 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                Audited
            </div>
        </div>
    </div>
);

const items = [
    {
        title: "Secure & Anonymous Voting Process",
        graphic: <SecureVotingGraphic />,
    },
    {
        title: "Automated Ledger & Smart Contracts",
        graphic: <LedgerGraphic />,
    },
    {
        title: "Approvals, Guardrails & Full Auditability",
        graphic: <VerificationGraphic />,
    },
];
