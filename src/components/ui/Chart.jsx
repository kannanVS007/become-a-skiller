import React from 'react';
import { motion } from 'framer-motion';

const Chart = ({ type = 'line', data = [], height = 200, color = '#00A8E8' }) => {
    // Simplified Mock Chart for Premium Aesthetic
    return (
        <div style={{ height }} className="relative w-full flex items-end gap-2 px-2">
            {data.map((val, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                    <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${val}%` }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                        className="w-full rounded-t-lg relative transition-all group-hover:brightness-110"
                        style={{
                            background: `linear-gradient(to top, ${color}22, ${color})`,
                        }}
                    >
                        {/* Tooltip on hover */}
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-30">
                            {val}% Growth
                        </div>
                    </motion.div>
                    <span className="text-[10px] text-gray-400 font-medium">M{i + 1}</span>
                </div>
            ))}

            {/* Background Grid Lines */}
            <div className="absolute inset-0 flex flex-col justify-between -z-10 opacity-5">
                {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-full h-px bg-gray-400"></div>
                ))}
            </div>
        </div>
    );
};

export default Chart;
