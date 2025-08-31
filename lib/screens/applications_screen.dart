import 'package:flutter/material.dart';

class ApplicationsScreen extends StatefulWidget {
  const ApplicationsScreen({super.key});

  @override
  State<ApplicationsScreen> createState() => _ApplicationsScreenState();
}

class _ApplicationsScreenState extends State<ApplicationsScreen> {
  String selectedFilter = 'All';
  final List<String> filters = ['All', 'Pending', 'Approved', 'Rejected', 'Under Review'];

  final List<Map<String, dynamic>> applications = [
    {
      'id': 'APP-2024-001',
      'petName': 'Buddy',
      'petType': 'Dog',
      'breed': 'Golden Retriever',
      'ownerName': 'Sarah Johnson',
      'status': 'Pending',
      'submittedDate': '2024-01-15',
      'premium': '\$89.99',
    },
    {
      'id': 'APP-2024-002',
      'petName': 'Whiskers',
      'petType': 'Cat',
      'breed': 'Persian',
      'ownerName': 'Mike Chen',
      'status': 'Approved',
      'submittedDate': '2024-01-14',
      'premium': '\$65.50',
    },
    {
      'id': 'APP-2024-003',
      'petName': 'Luna',
      'petType': 'Dog',
      'breed': 'Border Collie',
      'ownerName': 'Emma Davis',
      'status': 'Under Review',
      'submittedDate': '2024-01-13',
      'premium': '\$75.25',
    },
    {
      'id': 'APP-2024-004',
      'petName': 'Max',
      'petType': 'Dog',
      'breed': 'German Shepherd',
      'ownerName': 'Robert Wilson',
      'status': 'Rejected',
      'submittedDate': '2024-01-12',
      'premium': '\$95.00',
    },
  ];

  Color _getStatusColor(String status) {
    switch (status) {
      case 'Approved':
        return Colors.green;
      case 'Rejected':
        return Colors.red;
      case 'Under Review':
        return Colors.orange;
      case 'Pending':
      default:
        return Colors.blue;
    }
  }

  @override
  Widget build(BuildContext context) {
    final filteredApplications = selectedFilter == 'All'
        ? applications
        : applications.where((app) => app['status'] == selectedFilter).toList();

    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text(
                  'Insurance Applications',
                  style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
                ),
                ElevatedButton.icon(
                  onPressed: () {},
                  icon: const Icon(Icons.add),
                  label: const Text('New Application'),
                ),
              ],
            ),
            const SizedBox(height: 16),
            
            SizedBox(
              height: 40,
              child: ListView.builder(
                scrollDirection: Axis.horizontal,
                itemCount: filters.length,
                itemBuilder: (context, index) {
                  final filter = filters[index];
                  final isSelected = selectedFilter == filter;
                  return Padding(
                    padding: const EdgeInsets.only(right: 8.0),
                    child: FilterChip(
                      label: Text(filter),
                      selected: isSelected,
                      onSelected: (selected) {
                        setState(() {
                          selectedFilter = filter;
                        });
                      },
                    ),
                  );
                },
              ),
            ),
            const SizedBox(height: 16),

            Expanded(
              child: ListView.builder(
                itemCount: filteredApplications.length,
                itemBuilder: (context, index) {
                  final app = filteredApplications[index];
                  return Card(
                    margin: const EdgeInsets.only(bottom: 12),
                    child: ListTile(
                      contentPadding: const EdgeInsets.all(16),
                      leading: CircleAvatar(
                        backgroundColor: Theme.of(context).primaryColor.withOpacity(0.1),
                        child: Icon(
                          app['petType'] == 'Dog' ? Icons.pets : Icons.pets,
                          color: Theme.of(context).primaryColor,
                        ),
                      ),
                      title: Text(
                        '${app['petName']} - ${app['breed']}',
                        style: const TextStyle(fontWeight: FontWeight.bold),
                      ),
                      subtitle: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text('Owner: ${app['ownerName']}'),
                          Text('Application ID: ${app['id']}'),
                          Text('Submitted: ${app['submittedDate']}'),
                          const SizedBox(height: 4),
                          Row(
                            children: [
                              Container(
                                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                                decoration: BoxDecoration(
                                  color: _getStatusColor(app['status']).withOpacity(0.1),
                                  borderRadius: BorderRadius.circular(12),
                                ),
                                child: Text(
                                  app['status'],
                                  style: TextStyle(
                                    color: _getStatusColor(app['status']),
                                    fontSize: 12,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                              ),
                              const Spacer(),
                              Text(
                                app['premium'],
                                style: const TextStyle(
                                  fontWeight: FontWeight.bold,
                                  fontSize: 16,
                                ),
                              ),
                            ],
                          ),
                        ],
                      ),
                      trailing: PopupMenuButton(
                        itemBuilder: (context) => [
                          const PopupMenuItem(
                            value: 'view',
                            child: Text('View Details'),
                          ),
                          const PopupMenuItem(
                            value: 'approve',
                            child: Text('Approve'),
                          ),
                          const PopupMenuItem(
                            value: 'reject',
                            child: Text('Reject'),
                          ),
                        ],
                      ),
                    ),
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}
