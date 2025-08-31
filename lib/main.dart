import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:go_router/go_router.dart';
import 'package:google_fonts/google_fonts.dart';
import 'providers/auth_provider.dart';
import 'screens/auth_screen.dart';
import 'widgets/main_scaffold.dart';
import 'theme/app_theme.dart';

void main() {
  runApp(const SafePasturesAdmin());
}

class SafePasturesAdmin extends StatelessWidget {
  const SafePasturesAdmin({super.key});

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (context) => AuthProvider(),
      child: Consumer<AuthProvider>(
        builder: (context, authProvider, child) {
          final router = GoRouter(
            initialLocation: '/',
            redirect: (context, state) {
              final isLoggedIn = authProvider.user != null;
              final isLoggingIn = state.matchedLocation == '/auth';
              
              if (!isLoggedIn && !isLoggingIn) {
                return '/auth';
              }
              if (isLoggedIn && isLoggingIn) {
                return '/';
              }
              return null;
            },
            routes: [
              GoRoute(
                path: '/auth',
                builder: (context, state) => const AuthScreen(),
              ),
              GoRoute(
                path: '/',
                builder: (context, state) => const MainScaffold(),
              ),
            ],
          );

          return MaterialApp.router(
            title: 'Safe Pastures Admin',
            theme: AppTheme.lightTheme,
            darkTheme: AppTheme.darkTheme,
            themeMode: ThemeMode.light,
            routerConfig: router,
            debugShowCheckedModeBanner: false, // 👈 This hides the debug banner
          );
        },
      ),
    );
  }
}
