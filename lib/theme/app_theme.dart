import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AppTheme {
  // Professional veterinary color scheme
  static const Color primaryColor = Color(0xFF1A1A1A); // Dark gray/black
  static const Color secondaryColor = Color(0xFF8B5CF6); // Purple accent
  static const Color backgroundColor = Color(0xFFE3F2FD);
  static const Color cardColor = Color(0xFFFFFFFF);
  static const Color borderColor = Color(0xFFB3B3B3);
  static const Color mutedColor = Color(0xFF1A1A1A);

  static ThemeData lightTheme = ThemeData(
    useMaterial3: true,
    colorScheme: const ColorScheme.light(
      primary: primaryColor,
      secondary: secondaryColor,
      surface: backgroundColor,
      surfaceContainer: cardColor,
      outline: borderColor,
      onSurfaceVariant: mutedColor,
    ),
    textTheme: GoogleFonts.interTextTheme(),
    appBarTheme: const AppBarTheme(
      backgroundColor: cardColor,
      foregroundColor: primaryColor,
      elevation: 0,
      centerTitle: false,
    ),
    cardTheme: CardThemeData(
      color: cardColor,
      elevation: 0,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(8),
        side: const BorderSide(color: borderColor, width: 1),
      ),
    ),
    elevatedButtonTheme: ElevatedButtonThemeData(
      style: ElevatedButton.styleFrom(
        backgroundColor: primaryColor,
        foregroundColor: Colors.white,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(6)),
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      ),
    ),
    outlinedButtonTheme: OutlinedButtonThemeData(
      style: OutlinedButton.styleFrom(
        foregroundColor: primaryColor,
        side: const BorderSide(color: borderColor),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(6)),
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      ),
    ),
    bottomNavigationBarTheme: const BottomNavigationBarThemeData(
      backgroundColor: cardColor, // White background for light theme
      selectedItemColor: secondaryColor,
      unselectedItemColor: mutedColor,
    ),
  );

  static ThemeData darkTheme = ThemeData(
    useMaterial3: true,
    colorScheme: const ColorScheme.dark(
      primary: Colors.white,
      secondary: secondaryColor,
      surface: Color(0xFF1A1A1A),
      surfaceContainer: Color(0xFF2A2A2A),
      outline: Color(0xFF404040),
      onSurfaceVariant: Color(0xFFB3B3B3),
    ),
    textTheme: GoogleFonts.interTextTheme(ThemeData.dark().textTheme),
    appBarTheme: const AppBarTheme(
      backgroundColor: Color(0xFF2A2A2A),
      foregroundColor: Colors.white,
      elevation: 0,
      centerTitle: false,
    ),
    bottomNavigationBarTheme: const BottomNavigationBarThemeData(
      backgroundColor: Color(0xFF2A2A2A), // Dark background for dark theme
      selectedItemColor: secondaryColor,
      unselectedItemColor: Color(0xFFB3B3B3),
    ),
  );
}
