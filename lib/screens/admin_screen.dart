import 'package:flutter/material.dart';

class AdminScreen extends StatefulWidget {
  const AdminScreen({super.key});

  @override
  State<AdminScreen> createState() => _AdminScreenState();
}

class _AdminScreenState extends State<AdminScreen> {
  final List<Map<String, dynamic>> adminSections = [
    {
      'title': 'User Management',
      'description': 'Manage admin users and permissions',
      'icon': Icons.people,
      'color': Colors.blue,
      'items': ['Active Users: 12', 'Pending Invites: 3', 'Roles: 4'],
    },
    {
      'title': 'System Settings',
      'description': 'Configure application settings',
      'icon': Icons.settings,
      'color': Colors.green,
      'items': ['Email Templates', 'Notification Settings', 'API Configuration'],
    },
    {
      'title': 'Policy Management',
      'description': 'Manage insurance policies and coverage',
      'icon': Icons.policy,
      'color': Colors.orange,
      'items': ['Active Policies: 156', 'Coverage Types: 8', 'Premium Rates'],
    },
    {
      'title': 'Reports & Analytics',
      'description': 'View system reports and analytics',
      'icon': Icons.analytics,
      'color': Colors.purple,
      'items': ['Monthly Reports', 'Performance Metrics', 'Export Data'],
    },
    {
      'title': 'Audit Logs',
      'description': 'View system activity and audit trails',
      'icon': Icons.history,
      'color': Colors.red,
      'items': ['Recent Activity', 'Security Logs', 'Data Changes'],
    },
    {
      'title': 'Backup & Security',
      'description': 'Manage backups and security settings',
      'icon': Icons.security,
      'color': Colors.teal,
      'items': ['Last Backup: Today', 'Security Status: Good', 'SSL Certificate'],
    },
  ];

  final List<Map<String, dynamic>> recentActivity = [
    {
      'action': 'User Login',
      'user': 'admin@safepastures.com',
      'timestamp': '2 minutes ago',
      'icon': Icons.login,
    },
    {
      'action': 'Policy Updated',
      'user': 'sarah.manager@safepastures.com',
      'timestamp': '15 minutes ago',
      'icon': Icons.edit,
    },
    {
      'action': 'Backup Completed',
      'user': 'System',
      'timestamp': '1 hour ago',
      'icon': Icons.backup,
    },
    {
      'action': 'New User Registered',
      'user': 'mike.admin@safepastures.com',
      'timestamp': '2 hours ago',
      'icon': Icons.person_add,
    },
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'System Administration',
                      style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
                    ),
                    Text(
                      'Manage Safe Pastures Admin settings and configuration',
                      style: TextStyle(color: Colors.grey),
                    ),
                  ],
                ),
                ElevatedButton.icon(
                  onPressed: () {},
                  icon: const Icon(Icons.refresh),
                  label: const Text('Refresh'),
                ),
              ],
            ),
            const SizedBox(height: 24),

            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  colors: [Colors.green.withOpacity(0.1), Colors.blue.withOpacity(0.1)],
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                ),
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: Colors.green.withOpacity(0.3)),
              ),
              child: const Row(
                children: [
                  Icon(Icons.check_circle, color: Colors.green, size: 32),
                  SizedBox(width: 16),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'System Status: Operational',
                        style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                      ),
                      Text('All services running normally • Last updated: 2 min ago'),
                    ],
                  ),
                ],
              ),
            ),
            const SizedBox(height: 24),

            Expanded(
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Admin sections
                  Expanded(
                    flex: 2,
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text(
                          'Administration Sections',
                          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                        ),
                        const SizedBox(height: 16),
                        Expanded(
                          child: GridView.builder(
                            gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                              crossAxisCount: 2,
                              crossAxisSpacing: 12,
                              mainAxisSpacing: 12,
                              childAspectRatio: 1.2,
                            ),
                            itemCount: adminSections.length,
                            itemBuilder: (context, index) {
                              final section = adminSections[index];
                              return Card(
                                child: InkWell(
                                  onTap: () {},
                                  borderRadius: BorderRadius.circular(8),
                                  child: Padding(
                                    padding: const EdgeInsets.all(16),
                                    child: Column(
                                      crossAxisAlignment: CrossAxisAlignment.start,
                                      children: [
                                        Row(
                                          children: [
                                            Icon(
                                              section['icon'],
                                              color: section['color'],
                                              size: 28,
                                            ),
                                            const Spacer(),
                                            Icon(
                                              Icons.arrow_forward_ios,
                                              size: 16,
                                              color: Colors.grey[400],
                                            ),
                                          ],
                                        ),
                                        const SizedBox(height: 12),
                                        Text(
                                          section['title'],
                                          style: const TextStyle(
                                            fontSize: 16,
                                            fontWeight: FontWeight.bold,
                                          ),
                                        ),
                                        const SizedBox(height: 4),
                                        Text(
                                          section['description'],
                                          style: TextStyle(
                                            fontSize: 12,
                                            color: Colors.grey[600],
                                          ),
                                        ),
                                        const SizedBox(height: 8),
                                        ...section['items'].take(2).map<Widget>((item) => Padding(
                                          padding: const EdgeInsets.only(bottom: 2),
                                          child: Text(
                                            '• $item',
                                            style: TextStyle(
                                              fontSize: 11,
                                              color: Colors.grey[700],
                                            ),
                                          ),
                                        )).toList(),
                                      ],
                                    ),
                                  ),
                                ),
                              );
                            },
                          ),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(width: 16),
                  
                  // Recent activity sidebar
                  Expanded(
                    flex: 1,
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text(
                          'Recent Activity',
                          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                        ),
                        const SizedBox(height: 16),
                        Expanded(
                          child: ListView.builder(
                            itemCount: recentActivity.length,
                            itemBuilder: (context, index) {
                              final activity = recentActivity[index];
                              return Card(
                                margin: const EdgeInsets.only(bottom: 8),
                                child: ListTile(
                                  leading: CircleAvatar(
                                    backgroundColor: Theme.of(context).primaryColor.withOpacity(0.1),
                                    child: Icon(
                                      activity['icon'],
                                      color: Theme.of(context).primaryColor,
                                      size: 20,
                                    ),
                                  ),
                                  title: Text(
                                    activity['action'],
                                    style: const TextStyle(
                                      fontWeight: FontWeight.w500,
                                      fontSize: 14,
                                    ),
                                  ),
                                  subtitle: Column(
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    children: [
                                      Text(
                                        activity['user'],
                                        style: const TextStyle(fontSize: 12),
                                      ),
                                      Text(
                                        activity['timestamp'],
                                        style: TextStyle(
                                          fontSize: 11,
                                          color: Colors.grey[600],
                                        ),
                                      ),
                                    ],
                                  ),
                                  dense: true,
                                ),
                              );
                            },
                          ),
                        ),
                        const SizedBox(height: 16),
                        SizedBox(
                          width: double.infinity,
                          child: ElevatedButton.icon(
                            onPressed: () {},
                            icon: const Icon(Icons.visibility),
                            label: const Text('View All Logs'),
                            style: ElevatedButton.styleFrom(
                              backgroundColor: Theme.of(context).primaryColor,
                              foregroundColor: Colors.white,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
