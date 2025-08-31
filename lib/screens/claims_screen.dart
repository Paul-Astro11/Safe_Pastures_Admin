import 'package:flutter/material.dart';

class ClaimsScreen extends StatefulWidget {
  const ClaimsScreen({super.key});

  @override
  State<ClaimsScreen> createState() => _ClaimsScreenState();
}

class _ClaimsScreenState extends State<ClaimsScreen> {
  String selectedTab = 'Active';
  final List<String> tabs = ['Active', 'Pending', 'Approved', 'Denied'];

  final List<Map<String, dynamic>> claims = [
    {
      'id': 'CLM-2024-001',
      'petName': 'Buddy',
      'ownerName': 'Sarah Johnson',
      'condition': 'Hip Dysplasia Surgery',
      'claimAmount': '\$2,450.00',
      'status': 'Pending',
      'submittedDate': '2024-01-16',
      'vetClinic': 'City Animal Hospital',
      'priority': 'High',
    },
    {
      'id': 'CLM-2024-002',
      'petName': 'Whiskers',
      'ownerName': 'Mike Chen',
      'condition': 'Dental Cleaning',
      'claimAmount': '\$385.50',
      'status': 'Approved',
      'submittedDate': '2024-01-15',
      'vetClinic': 'Pet Care Center',
      'priority': 'Medium',
    },
    {
      'id': 'CLM-2024-003',
      'petName': 'Luna',
      'ownerName': 'Emma Davis',
      'condition': 'Emergency Visit - Poisoning',
      'claimAmount': '\$1,200.00',
      'status': 'Active',
      'submittedDate': '2024-01-17',
      'vetClinic': 'Emergency Pet Hospital',
      'priority': 'Critical',
    },
    {
      'id': 'CLM-2024-004',
      'petName': 'Charlie',
      'ownerName': 'David Brown',
      'condition': 'Routine Checkup',
      'claimAmount': '\$125.00',
      'status': 'Denied',
      'submittedDate': '2024-01-10',
      'vetClinic': 'Neighborhood Vet',
      'priority': 'Low',
    },
  ];

  Color _getStatusColor(String status) {
    switch (status) {
      case 'Approved':
        return Colors.green;
      case 'Denied':
        return Colors.red;
      case 'Active':
        return Colors.blue;
      case 'Pending':
      default:
        return Colors.orange;
    }
  }

  Color _getPriorityColor(String priority) {
    switch (priority) {
      case 'Critical':
        return Colors.red;
      case 'High':
        return Colors.orange;
      case 'Medium':
        return Colors.blue;
      case 'Low':
      default:
        return Colors.grey;
    }
  }

  @override
  Widget build(BuildContext context) {
    final filteredClaims = selectedTab == 'Active'
        ? claims
        : claims.where((claim) => claim['status'] == selectedTab).toList();

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
                  'Insurance Claims',
                  style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
                ),
                ElevatedButton.icon(
                  onPressed: () {},
                  icon: const Icon(Icons.add),
                  label: const Text('New Claim'),
                ),
              ],
            ),
            const SizedBox(height: 16),

            SizedBox(
              height: 80,
              child: ListView(
                scrollDirection: Axis.horizontal,
                children: [
                  _buildStatCard('Total Claims', '24', Colors.blue),
                  _buildStatCard('Pending Review', '8', Colors.orange),
                  _buildStatCard('This Month', '\$12,450', Colors.green),
                  _buildStatCard('Average', '\$890', Colors.purple),
                ],
              ),
            ),
            const SizedBox(height: 16),

            SizedBox(
              height: 40,
              child: ListView.builder(
                scrollDirection: Axis.horizontal,
                itemCount: tabs.length,
                itemBuilder: (context, index) {
                  final tab = tabs[index];
                  final isSelected = selectedTab == tab;
                  return Padding(
                    padding: const EdgeInsets.only(right: 8.0),
                    child: FilterChip(
                      label: Text(tab),
                      selected: isSelected,
                      onSelected: (selected) {
                        setState(() {
                          selectedTab = tab;
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
                itemCount: filteredClaims.length,
                itemBuilder: (context, index) {
                  final claim = filteredClaims[index];
                  return Card(
                    margin: const EdgeInsets.only(bottom: 12),
                    child: ExpansionTile(
                      leading: CircleAvatar(
                        backgroundColor: _getPriorityColor(claim['priority']).withOpacity(0.1),
                        child: Icon(
                          Icons.medical_services,
                          color: _getPriorityColor(claim['priority']),
                        ),
                      ),
                      title: Text(
                        '${claim['petName']} - ${claim['condition']}',
                        style: const TextStyle(fontWeight: FontWeight.bold),
                      ),
                      subtitle: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text('Owner: ${claim['ownerName']}'),
                          Text('Claim ID: ${claim['id']}'),
                          Row(
                            children: [
                              Container(
                                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                                decoration: BoxDecoration(
                                  color: _getStatusColor(claim['status']).withOpacity(0.1),
                                  borderRadius: BorderRadius.circular(12),
                                ),
                                child: Text(
                                  claim['status'],
                                  style: TextStyle(
                                    color: _getStatusColor(claim['status']),
                                    fontSize: 12,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                              ),
                              const SizedBox(width: 8),
                              Container(
                                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                                decoration: BoxDecoration(
                                  color: _getPriorityColor(claim['priority']).withOpacity(0.1),
                                  borderRadius: BorderRadius.circular(12),
                                ),
                                child: Text(
                                  claim['priority'],
                                  style: TextStyle(
                                    color: _getPriorityColor(claim['priority']),
                                    fontSize: 12,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                              ),
                              const Spacer(),
                              Text(
                                claim['claimAmount'],
                                style: const TextStyle(
                                  fontWeight: FontWeight.bold,
                                  fontSize: 16,
                                ),
                              ),
                            ],
                          ),
                        ],
                      ),
                      children: [
                        Padding(
                          padding: const EdgeInsets.all(16.0),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Row(
                                children: [
                                  const Icon(Icons.local_hospital, size: 16),
                                  const SizedBox(width: 8),
                                  Text('Clinic: ${claim['vetClinic']}'),
                                ],
                              ),
                              const SizedBox(height: 8),
                              Row(
                                children: [
                                  const Icon(Icons.calendar_today, size: 16),
                                  const SizedBox(width: 8),
                                  Text('Submitted: ${claim['submittedDate']}'),
                                ],
                              ),
                              const SizedBox(height: 16),
                              Row(
                                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                                children: [
                                  ElevatedButton.icon(
                                    onPressed: () {},
                                    icon: const Icon(Icons.visibility, size: 16),
                                    label: const Text('View'),
                                    style: ElevatedButton.styleFrom(
                                      backgroundColor: Colors.blue,
                                      foregroundColor: Colors.white,
                                    ),
                                  ),
                                  ElevatedButton.icon(
                                    onPressed: () {},
                                    icon: const Icon(Icons.check, size: 16),
                                    label: const Text('Approve'),
                                    style: ElevatedButton.styleFrom(
                                      backgroundColor: Colors.green,
                                      foregroundColor: Colors.white,
                                    ),
                                  ),
                                  ElevatedButton.icon(
                                    onPressed: () {},
                                    icon: const Icon(Icons.close, size: 16),
                                    label: const Text('Deny'),
                                    style: ElevatedButton.styleFrom(
                                      backgroundColor: Colors.red,
                                      foregroundColor: Colors.white,
                                    ),
                                  ),
                                ],
                              ),
                            ],
                          ),
                        ),
                      ],
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

  Widget _buildStatCard(String title, String value, Color color) {
    return Container(
      width: 120,
      margin: const EdgeInsets.only(right: 12),
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: color.withOpacity(0.1),
        borderRadius: BorderRadius.circular(8),
        border: Border.all(color: color.withOpacity(0.3)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            title,
            style: TextStyle(
              fontSize: 12,
              color: color,
              fontWeight: FontWeight.w500,
            ),
          ),
          const SizedBox(height: 4),
          Text(
            value,
            style: TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.bold,
              color: color,
            ),
          ),
        ],
      ),
    );
  }
}
