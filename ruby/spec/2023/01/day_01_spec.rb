require '2023/01/day_01'

LIB_DIR = "#{__dir__}/../../../lib"

RSpec.describe Day01, "#part1" do
  context "for example1" do
    it "returns the expected value" do
        part1 = Day01.part1(File.read("#{LIB_DIR}/2023/01/example1.txt").split("\n"))
        expect(part1).to eq 209
    end
  end

  context "for my input" do
    it "returns the expected value" do
        part1 = Day01.part1(File.read("#{LIB_DIR}/2023/01/input.txt").split("\n"))
        expect(part1).to eq 55816
    end
  end
end

RSpec.describe Day01, "#part2" do
  context "for example1" do
    it "returns the expected value" do
        part2 = Day01.part2(File.read("#{LIB_DIR}/2023/01/example1.txt").split("\n"))
        expect(part2).to eq 281
    end
  end

  context "for my input" do
    it "returns the expected value" do
        part2 = Day01.part2(File.read("#{LIB_DIR}/2023/01/input.txt").split("\n"))
        expect(part2).to eq 54980
    end
  end
end
