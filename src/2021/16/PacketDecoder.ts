// Year 2021 Day 16
// Packet Decoder

import { ISolution } from '../../util';

enum PacketType {
    ADD = 0,
    MUL = 1,
    MIN = 2,
    MAX = 3,
    VAL = 4,
    GTH = 5,
    LTH = 6,
    EQU = 7
}

type OperatorPacket = {
    version: number;
    type: Exclude<PacketType, PacketType.VAL>;
    subpackets: Packet[];
    totalBits: number;
}

type ValuePacket = {
    version: number;
    type: PacketType.VAL;
    value: number;
    totalBits: number;
}

type Packet = ValuePacket | OperatorPacket;

function parse(str: string): Packet {
    let idx: number = 0;

    const version = parseInt(str.slice(idx, idx += 3), 2);
    const type = parseInt(str.slice(idx, idx += 3), 2) as PacketType;

    switch (type) {
        case PacketType.VAL: {
            const packet: Packet = {
                version,
                type,
                value: 0,
                totalBits: 0
            };

            while (str[idx++] === '1') {
                packet.value = packet.value * 16 + parseInt(str.slice(idx, idx += 4), 2);
            }
            packet.value = packet.value * 16 + parseInt(str.slice(idx, idx += 4), 2);

            packet.totalBits = idx;
            return packet;
        }
        default: {
            const packet: Packet = {
                version,
                type,
                subpackets: [],
                totalBits: 0
            };

            const lengthType: number = Number(str.slice(idx, idx += 1));

            if (lengthType === 0) {
                const length: number = parseInt(str.slice(idx, idx += 15), 2);
                let consumed: number = 0;
                while (consumed < length) {
                    const subpacket = parse(str.slice(idx));
                    packet.subpackets.push(subpacket);
                    idx += subpacket.totalBits;
                    consumed += subpacket.totalBits;
                }
                if (consumed !== length) throw new Error();
            } else {
                const length: number = parseInt(str.slice(idx, idx += 11), 2);
                for (let i = 0; i < length; i++) {
                    const subpacket = parse(str.slice(idx));
                    packet.subpackets.push(subpacket);
                    idx += subpacket.totalBits;
                }
            }

            packet.totalBits = idx;
            return packet;
        }
    }
}

function sumVersions(packet: Packet): number {
    if (packet.type === PacketType.VAL) {
        return packet.version;
    } else {
        return packet.version + packet.subpackets.map(s => sumVersions(s))
            .reduce((sum, value) => sum + value, 0);
    }
}

function calculate(packet: Packet): number {
    switch (packet.type) {
        case PacketType.ADD:
            return packet.subpackets.map(calculate).reduce((sum, value) => sum + value, 0);
        case PacketType.MUL:
            return packet.subpackets.map(calculate).reduce((sum, value) => sum * value, 1);
        case PacketType.MIN:
            return Math.min(...packet.subpackets.map(calculate));
        case PacketType.MAX:
            return Math.max(...packet.subpackets.map(calculate));
        case PacketType.VAL:
            return packet.value;
        case PacketType.GTH:
            return calculate(packet.subpackets[0]) > calculate(packet.subpackets[1]) ? 1 : 0;
        case PacketType.LTH:
            return calculate(packet.subpackets[0]) < calculate(packet.subpackets[1]) ? 1 : 0;
        case PacketType.EQU:
            return calculate(packet.subpackets[0]) === calculate(packet.subpackets[1]) ? 1 : 0;
    }
}

export function solve(input: string[]): ISolution<number> {
    const binaryString: string = Buffer.from(input[0], 'hex').toString('binary')
        .split('').map(s => s.charCodeAt(0).toString(2).padStart(8, '0')).join('');

    const packet: Packet = parse(binaryString);

    // Part 1
    const part1: number = sumVersions(packet);

    // Part 2
    const part2: number = calculate(packet);

    return { part1, part2 };
}
