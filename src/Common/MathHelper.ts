
export default class MathHelper {

    // http://stackoverflow.com/questions/109023/how-to-count-the-number-of-set-bits-in-a-32-bit-integer#109025
    // ----------------------------------------------------------------------------------
    // This implementation is taken from a C/C++ example. Javascript supports integers in
    // the range +/-2^53. The >> operator in Javascript operates on 32-bit numbers, so
    // this should be fine. I don't think the canvas would support sizes as large as
    // 1 << 31 anyway. =)
    // -- @groundh0g
    // ----------------------------------------------------------------------------------
    public static CountBits(i: number) {
        // i = parseInt(i);
        i = i - ((i >> 1) & 0x55555555);
        i = (i & 0x33333333) + ((i >> 2) & 0x33333333);
        return (((i + (i >> 4)) & 0x0F0F0F0F) * 0x01010101) >> 24;
    };

    // ----------------------------------
    // [VERY] simple helper -- @groundh0g
    // ----------------------------------
    public static IsPowerOfTwo(i: number) {
        return MathHelper.CountBits(i) === 1;
    };

    // http://www.hackersdelight.org/hdcodetxt/clp2.c.txt
    // ----------------------------------------------------
    // Round up if not Po2, Same value if Po2 -- @groundh0g
    // ----------------------------------------------------
    public static RoundUpToPowerOfTwo(n: number) {
        n = n - 1; // parseInt(x) - 1;
        n = n | (n >> 1);
        n = n | (n >> 2);
        n = n | (n >> 4);
        n = n | (n >> 8);
        n = n | (n >>16);
        return n + 1;
    };

    // ----------------------------------
    // [VERY] simple helper -- @groundh0g
    // ----------------------------------
    public static Clamp(value: number, min: number, max: number) {
        return Math.min(Math.max(value || 0, min), max);
    }

}