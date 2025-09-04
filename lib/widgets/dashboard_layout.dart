import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:go_router/go_router.dart';
import '../providers/auth_provider.dart';

class NavigationItem {
  final String name;
  final String route;
  final IconData icon;
  final bool current;

  NavigationItem({
    required this.name,
    required this.route,
    required this.icon,
    this.current = false,
  });
}

class DashboardLayout extends StatefulWidget {
  final Widget child;
  final String currentRoute;

  const DashboardLayout({
    super.key,
    required this.child,
    required this.currentRoute,
  });

  @override
  State<DashboardLayout> createState() => _DashboardLayoutState();
}

class _DashboardLayoutState extends State<DashboardLayout> {
  final GlobalKey<ScaffoldState> _scaffoldKey = GlobalKey<ScaffoldState>();

  List<NavigationItem> get navigationItems => [
    NavigationItem(
      name: 'Dashboard',
      route: '/',
      icon: Icons.dashboard,
      current: widget.currentRoute == '/',
    ),
    NavigationItem(
      name: 'Applications',
      route: '/applications',
      icon: Icons.description,
      current: widget.currentRoute == '/applications',
    ),
    NavigationItem(
      name: 'Claims',
      route: '/claims',
      icon: Icons.assignment,
      current: widget.currentRoute == '/claims',
    ),
    NavigationItem(
      name: 'Payments',
      route: '/payments',
      icon: Icons.payment,
      current: widget.currentRoute == '/payments',
    ),
    NavigationItem(
      name: 'Administration',
      route: '/admin',
      icon: Icons.settings,
      current: widget.currentRoute == '/admin',
    ),
  ];

  @override
  Widget build(BuildContext context) {
    final user = context.watch<AuthProvider>().user;
    final theme = Theme.of(context);
    
    return Scaffold(
      key: _scaffoldKey,
      appBar: AppBar(
        title: Row(
          children: [
            Icon(Icons.shield, color: theme.colorScheme.primary),
            const SizedBox(width: 8),
            const Text('Safe Pastures Admin', style: TextStyle(fontWeight: FontWeight.w600)),
          ],
        ),
        actions: [
          PopupMenuButton<String>(
            child: CircleAvatar(
              backgroundColor: theme.colorScheme.primary,
              child: Text(
                user?.initials ?? 'U',
                style: TextStyle(color: theme.colorScheme.onPrimary),
              ),
            ),
            itemBuilder: (context) => [
              PopupMenuItem(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(user?.email ?? '', style: const TextStyle(fontWeight: FontWeight.w500)),
                    Text(user?.displayRole ?? '', style: TextStyle(
                      fontSize: 12,
                      color: theme.colorScheme.onSurfaceVariant,
                    )),
                  ],
                ),
              ),
              const PopupMenuDivider(),
              const PopupMenuItem(
                value: 'profile',
                child: Row(
                  children: [
                    Icon(Icons.person),
                    SizedBox(width: 8),
                    Text('Profile'),
                  ],
                ),
              ),
              const PopupMenuItem(
                value: 'settings',
                child: Row(
                  children: [
                    Icon(Icons.settings),
                    SizedBox(width: 8),
                    Text('Settings'),
                  ],
                ),
              ),
              const PopupMenuDivider(),
              const PopupMenuItem(
                value: 'logout',
                child: Row(
                  children: [
                    Icon(Icons.logout),
                    SizedBox(width: 8),
                    Text('Log out'),
                  ],
                ),
              ),
            ],
            onSelected: (value) {
              if (value == 'logout') {
                context.read<AuthProvider>().logout();
              }
            },
          ),
          const SizedBox(width: 16),
        ],
      ),
      drawer: _buildDrawer(context),
      body: Row(
        children: [
          if (MediaQuery.of(context).size.width >= 1024) _buildSidebar(context),
          Expanded(
            child: Padding(
              padding: const EdgeInsets.all(24),
              child: widget.child,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSidebar(BuildContext context) {
    final theme = Theme.of(context);
    
    return Container(
      width: 256,
      decoration: BoxDecoration(
        color: theme.colorScheme.surfaceContainer,
        border: Border(right: BorderSide(color: theme.colorScheme.outline)),
      ),
      child: Column(
        children: [
          Container(
            height: 64,
            padding: const EdgeInsets.symmetric(horizontal: 24),
            child: Row(
              children: [
                Icon(Icons.shield, color: theme.colorScheme.primary, size: 32),
                const SizedBox(width: 8),
                Text(
                  'Safe Pastures',
                  style: TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.w600,
                    color: theme.colorScheme.onSurface,
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 32),
          Expanded(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: Column(
                children: navigationItems.map((item) => _buildNavItem(context, item)).toList(),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildDrawer(BuildContext context) {
    final theme = Theme.of(context);
    
    return Drawer(
      child: Column(
        children: [
          DrawerHeader(
            decoration: BoxDecoration(color: theme.colorScheme.surfaceContainer),
            child: Row(
              children: [
                Icon(Icons.shield, color: theme.colorScheme.primary, size: 32),
                const SizedBox(width: 8),
                Text(
                  'Safe Pastures',
                  style: TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.w600,
                    color: theme.colorScheme.onSurface,
                  ),
                ),
              ],
            ),
          ),
          Expanded(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: Column(
                children: navigationItems.map((item) => _buildNavItem(context, item)).toList(),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildNavItem(BuildContext context, NavigationItem item) {
    final theme = Theme.of(context);
    
    return Container(
      margin: const EdgeInsets.only(bottom: 8),
      child: ListTile(
        leading: Icon(item.icon),
        title: Text(item.name),
        selected: item.current,
        selectedTileColor: theme.colorScheme.secondary.withOpacity(0.1),
        selectedColor: theme.colorScheme.secondary,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
        onTap: () {
          context.go(item.route);
          if (MediaQuery.of(context).size.width < 1024) {
            Navigator.of(context).pop();
          }
        },
      ),
    );
  }
}
