# 2023 Day 01

class Day01
    def self.part1(lines)
        values = lines.map { |line, idx|
            digits = line.scan(/\d/)
            [digits[0], digits[-1]].join.to_i
        }
        values.sum
    end

    def self.part2(lines)
        digit_strings = {
            "one" => 1,
            "two" => 2,
            "three" => 3,
            "four" => 4,
            "five" => 5,
            "six" => 6,
            "seven" => 7,
            "eight" => 8,
            "nine" => 9
        }

        values = lines.map { |line|
            digits = (0..line.length - 1)
              .map { |idx| line.slice(idx..-1)
              .match(/^(\d|#{digit_strings.keys.join("|")})/) }
              .select { |result| result }
              .map { |result| result[1] }

            [digits[0], digits[-1]].map { |value| digit_strings[value] || value }.join.to_i
        }
        values.sum
    end
end

if $0 == __FILE__
    input = ARGV[0] || "input.txt"
    puts Day01.part1(File.read(input).split("\n"))
    puts Day01.part2(File.read(input).split("\n"))
end
