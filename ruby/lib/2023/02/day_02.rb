# 2023 Day 02

class Day02
    def self.title
        "Cube Conundrum"
    end

    def self.part1(lines)
        games = lines.map { |line|
            m = line.match(/Game (\d+): (.+)/)
            {
                "game" => m[1].to_i,
                "sets" => m[2].split("; ").map { |a|
                    Hash[a.split(", ").map { |b|
                        list = b.split(" ")
                        [list[1], list[0].to_i]
                    }]
                }
            }
        }

        possible_games = games.select { |game|
            !game["sets"].any? { |set| (set["red"] || 0) > 12 || (set["green"] || 0) > 13 || (set["blue"] || 0) > 14 }
        }

        possible_games.map { |game| game["game"] }.sum
    end

    def self.part2(lines)
        games = lines.map { |line|
            m = line.match(/Game (\d+): (.+)/)
            {
                "game" => m[1].to_i,
                "sets" => m[2].split("; ").map { |a|
                    Hash[a.split(", ").map { |b|
                        list = b.split(" ")
                        [list[1], list[0].to_i]
                    }]
                }
            }
        }

        powers = games.map { |game|
            red = game["sets"].map { |set| set["red"] || 0 }.max
            green = game["sets"].map { |set| set["green"] || 0 }.max
            blue = game["sets"].map { |set| set["blue"] || 0 }.max
            red * green * blue
        }

        powers.sum
    end
end

if $0 == __FILE__
    input = ARGV[0] || "input.txt"
    puts "--- #{Day02.title} ---"
    part1 = Day02.part1(File.read(input).split("\n"))
    puts "Part 1: #{part1}"
    part2 = Day02.part2(File.read(input).split("\n"))
    puts "Part 2: #{part2}"
end
