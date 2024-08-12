# Common Folder

This is logic that I copied from the common image parsing and sprite packing module to more easily iterate on changes. Ultimately this code will need to be moved back into its own repo so that the code can be shared by web, desktop, and CLI.

Come to think of it, the image parsing might be better isolated in its own module, separate from sprite packing. The packer shouldn't know about image formats. Even the pixel arrays are irrelevant -- packers deal with rectangles (possibly rotated).