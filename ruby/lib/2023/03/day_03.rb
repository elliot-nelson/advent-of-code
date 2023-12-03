# 2023 Day 03

class Day03
    def self.title
        "Gear Ratios"
    end

    def self.frog(grid, xlist, ylist)
        ylist.each do |y|
            xlist.each do |x|
                c = (grid[y] || [])[x]
                if c && c != "." && !c.match(/\d/)
                    return true
                end
            end
        end

        false
    end

    def self.gears(grid, xlist, ylist)
        gears = []

        ylist.each do |y|
            xlist.each do |x|
                c = (grid[y] || [])[x]
                if c == '*'
                    gears << [x, y]
                end
            end
        end

        gears
    end

    def self.part1(lines)
        grid = lines.map { |line| line.split("") }

        possible_parts = []

        lines.map.with_index { |line, idx|
            line.scan(/(\d+)/) { |value| possible_parts << [value[0].to_i, Regexp.last_match.begin(0), idx] }
        }

        parts = possible_parts.select { |part|
            frog(grid, part[1]-1..part[1]+part[0].to_s.length, part[2]-1..part[2]+1)
        }

        parts.map { |part| part[0] }.sum
    end

    def self.part2(lines)
        grid = lines.map { |line| line.split("") }

        possible_parts = []

        lines.map.with_index { |line, idx|
            line.scan(/(\d+)/) { |value| possible_parts << [value[0].to_i, Regexp.last_match.begin(0), idx] }
        }

        hash = {}

        parts = possible_parts.select { |part|
            gears(grid, part[1]-1..part[1]+part[0].to_s.length, part[2]-1..part[2]+1).each do |gear|
                hash[gear] ||= []
                hash[gear] << part
            end
        }

        v = hash.keys.select {|key| hash[key].length == 2 }.map {|key| hash[key][0][0] * hash[key][1][0] }.sum

        v
    end
end

if $0 == __FILE__
    input = ARGV[0] || "input.txt"
    puts "--- #{Day03.title} ---"
    part1 = Day03.part1(File.read(input).split("\n"))
    puts "Part 1: #{part1}"
    part2 = Day03.part2(File.read(input).split("\n"))
    puts "Part 2: #{part2}"
end
